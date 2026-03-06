'use client';

import { useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { useLocale, useTranslations } from 'next-intl';
import { Download, Upload } from 'lucide-react';
import { useImportWarehouseCSV } from '../hooks/useImportWarehouseCSV';
import {
  rawRowToWarehouseItem,
  isRowEmpty
} from '@/lib/warehouse-import-utils';
import type { WarehouseCSVItem } from './ImportWarehouseCSV';

const WAREHOUSE_IMPORT_TEMPLATE_HEADERS = [
  'name',
  'sku',
  'upc',
  'pricePerItem',
  'weightPerItem',
  'quantity',
  'productCategory',
  'retrnxboxDamaged',
  'warehouseId'
] as const;

const WAREHOUSE_IMPORT_TEMPLATE_SAMPLE_ROW: Record<string, string> = {
  name: 'Sample Product',
  sku: 'SKU-001',
  upc: '123456789012',
  pricePerItem: '10.99',
  weightPerItem: '0.5',
  quantity: '100',
  productCategory: 'Carry-On',
  retrnxboxDamaged: '0',
  warehouseId: ''
};

function getWarehouseImportTemplateCSV(): string {
  const headers = WAREHOUSE_IMPORT_TEMPLATE_HEADERS.join(',');
  const sampleValues = WAREHOUSE_IMPORT_TEMPLATE_HEADERS.map(
    (h) => WAREHOUSE_IMPORT_TEMPLATE_SAMPLE_ROW[h] ?? ''
  ).join(',');
  return `${headers}\n${sampleValues}`;
}

function downloadTemplateFile(
  filename: string,
  content: string,
  mimeType: string
) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

type ValidationErrorKey =
  | 'missingColumn'
  | 'invalidName'
  | 'invalidSKU'
  | 'invalidUPC'
  | 'invalidPrice'
  | 'invalidQuantity'
  | 'invalidWeight'
  | 'invalidWarehouseId';

const isValidUUID = (value: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);

function validateRow(
  row: WarehouseCSVItem,
  rowIndex: number
): { key: ValidationErrorKey; row: number } | null {
  if (!row.name || typeof row.name !== 'string') {
    return { key: 'invalidName', row: rowIndex + 1 };
  }
  if (!row.sku || typeof row.sku !== 'string') {
    return { key: 'invalidSKU', row: rowIndex + 1 };
  }
  if (typeof row.upc !== 'string') {
    return { key: 'invalidUPC', row: rowIndex + 1 };
  }
  if (!Number.isFinite(Number(row.pricePerItem))) {
    return { key: 'invalidPrice', row: rowIndex + 1 };
  }
  if (!Number.isFinite(Number(row.quantity))) {
    return { key: 'invalidQuantity', row: rowIndex + 1 };
  }
  if (!Number.isFinite(Number(row.weightPerItem))) {
    return { key: 'invalidWeight', row: rowIndex + 1 };
  }
  const warehouseId = (row.warehouseId ?? '').trim();
  if (warehouseId && !isValidUUID(warehouseId)) {
    return { key: 'invalidWarehouseId', row: rowIndex + 1 };
  }
  return null;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function BulkUploadModal({
  open,
  onOpenChange,
  onSuccess
}: Props) {
  const t = useTranslations('WarehouseImportToast');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSuccess = useCallback(() => {
    onSuccess?.();
    onOpenChange(false);
  }, [onSuccess, onOpenChange]);

  const { importCSV, loading } = useImportWarehouseCSV(handleSuccess);

  const showRowError = (errorKey: ValidationErrorKey, row: number) => {
    toast.error(t(`rowError.${errorKey}`, { row }));
  };

  const processFile = useCallback(
    (file: File) => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      if (!extension || !['csv', 'xlsx'].includes(extension)) {
        toast.error(t('invalidExtension'));
        return;
      }

      if (extension === 'csv') {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (h) => h.trim(),
          complete: (result) => {
            const data = result.data as Record<string, unknown>[];
            if (result.errors.length) return toast.error(t('invalidFormat'));
            if (!data.length) return toast.error(t('emptyCSV'));
            const items: WarehouseCSVItem[] = [];
            for (let i = 0; i < data.length; i++) {
              const raw = data[i] as Record<string, unknown>;
              if (isRowEmpty(raw)) continue;
              const row = rawRowToWarehouseItem(raw);
              const error = validateRow(row, i);
              if (error) return showRowError(error.key, error.row);
              items.push(row);
            }
            if (!items.length) return toast.error(t('emptyCSV'));
            importCSV({ items });
            toast.success(t('csvSuccess'));
          }
        });
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          const buffer = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(buffer, { type: 'array' });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const rawData = XLSX.utils.sheet_to_json<Record<string, unknown>>(
            worksheet,
            { defval: '' }
          );
          if (!rawData.length) return toast.error(t('emptyXLSX'));
          const items: WarehouseCSVItem[] = [];
          for (let i = 0; i < rawData.length; i++) {
            const raw = rawData[i] as Record<string, unknown>;
            if (isRowEmpty(raw)) continue;
            const row = rawRowToWarehouseItem(raw);
            const error = validateRow(row, i);
            if (error) return showRowError(error.key, error.row);
            items.push(row);
          }
          if (!items.length) return toast.error(t('emptyXLSX'));
          importCSV({ items });
          toast.success(t('xlsxSuccess'));
        };
        reader.readAsArrayBuffer(file);
      }
    },
    [t, importCSV]
  );

  const handleDownloadTemplate = () => {
    const csv = getWarehouseImportTemplateCSV();
    downloadTemplateFile(
      'warehouse-items-import-template.csv',
      csv,
      'text/csv;charset=utf-8;'
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir={isRTL ? 'rtl' : 'ltr'}
        className={`max-h-[90vh] w-[95vw] overflow-y-auto sm:max-w-md ${isRTL ? 'text-right' : 'text-left'}`}
      >
        <DialogHeader>
          <DialogTitle className='text-center'>
            {t('bulkUploadTitle')}
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-6 py-2'>
          {/* Template download */}
          <div className='space-y-2'>
            <p className='text-muted-foreground text-sm'>
              {t('templateDescription')}
            </p>
            <Button
              type='button'
              variant='outline'
              className='w-full'
              onClick={handleDownloadTemplate}
            >
              <Download className='mr-2 h-4 w-4' />
              {t('downloadTemplate')}
            </Button>
          </div>

          {/* Upload file */}
          <div className='space-y-2'>
            <p className='text-muted-foreground text-sm'>
              {t('uploadDescription')}
            </p>
            <input
              ref={fileInputRef}
              type='file'
              accept='.csv,.xlsx'
              className='hidden'
              onChange={handleFileChange}
            />
            <div
              role='button'
              tabIndex={0}
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className='border-muted-foreground/25 bg-muted/30 hover:border-primary/50 hover:bg-muted/50 flex min-h-[120px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-4 transition-colors'
            >
              <Upload className='text-muted-foreground h-10 w-10' />
              <span className='text-muted-foreground text-center text-sm'>
                {t('uploadHint')}
              </span>
              <Button
                type='button'
                size='sm'
                disabled={loading}
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                {loading ? t('importing') : t('importButton')}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
