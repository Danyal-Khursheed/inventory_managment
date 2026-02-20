'use client';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { useTranslations } from 'next-intl';
import { useImportWarehouseCSV } from '../hooks/useImportWarehouseCSV';
import {
  rawRowToWarehouseItem,
  isRowEmpty
} from '@/lib/warehouse-import-utils';

export type WarehouseCSVItem = {
  name: string;
  sku: string;
  upc: string;
  pricePerItem: number;
  weightPerItem: number;
  quantity: number;
  warehouseId: string;
  productCategory: string;
  retrnxboxDamaged: number;
};

interface Props {
  onSuccess?: () => void;
}

export type ImportCSVPayload = {
  items: WarehouseCSVItem[];
};

const isValidUUID = (value: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);

type ValidationErrorKey =
  | 'missingColumn'
  | 'invalidName'
  | 'invalidSKU'
  | 'invalidUPC'
  | 'invalidPrice'
  | 'invalidQuantity'
  | 'invalidWeight'
  | 'invalidWarehouseId';

const validateRow = (
  row: WarehouseCSVItem,
  rowIndex: number
): { key: ValidationErrorKey; row: number } | null => {
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
};

export default function ImportWarehouseCSV({ onSuccess }: Props) {
  const t = useTranslations('WarehouseImportToast');
  const { importCSV, loading } = useImportWarehouseCSV(onSuccess);

  const showRowError = (errorKey: ValidationErrorKey, row: number) => {
    toast.error(t(`rowError.${errorKey}`, { row }));
  };

  const handleCSV = (file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim(),
      complete: (result) => {
        // Type assertion here
        const data = result.data as Record<string, unknown>[];

        if (result.errors.length) {
          return toast.error(t('invalidFormat'));
        }

        if (!data.length) {
          return toast.error(t('emptyCSV'));
        }

        // Debug: log raw column names and first rows from CSV
        const first = data[0] as Record<string, unknown>;
        console.log('[Import CSV] Column names:', Object.keys(first));
        console.log('[Import CSV] First 3 raw rows:', data.slice(0, 3));

        const items: WarehouseCSVItem[] = [];

        for (let i = 0; i < data.length; i++) {
          const raw = data[i] as Record<string, unknown>;
          if (isRowEmpty(raw)) continue;

          const row = rawRowToWarehouseItem(raw);
          if (items.length < 3)
            console.log(`[Import CSV] Row ${i + 1} normalized:`, { ...row });
          const error = validateRow(row, i);
          if (error) return showRowError(error.key, error.row);

          items.push(row);
        }

        if (!items.length) return toast.error(t('emptyCSV'));

        importCSV({ items });
        toast.success(t('csvSuccess'));
      }
    });
  };

  const handleXLSX = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const buffer = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(buffer, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      const rawData = XLSX.utils.sheet_to_json<Record<string, unknown>>(
        worksheet,
        {
          defval: ''
        }
      );

      if (!rawData.length) {
        return toast.error(t('emptyXLSX'));
      }

      // Debug: log raw column names and first rows from Excel
      const firstX = rawData[0] as Record<string, unknown>;
      console.log('[Import XLSX] Column names:', Object.keys(firstX));
      console.log('[Import XLSX] First 3 raw rows:', rawData.slice(0, 3));

      const items: WarehouseCSVItem[] = [];

      for (let i = 0; i < rawData.length; i++) {
        const raw = rawData[i] as Record<string, unknown>;
        if (isRowEmpty(raw)) continue;

        const row = rawRowToWarehouseItem(raw);
        if (items.length < 3)
          console.log(`[Import XLSX] Row ${i + 1} normalized:`, { ...row });
        const error = validateRow(row, i);
        if (error) return showRowError(error.key, error.row);

        items.push(row);
      }

      if (!items.length) return toast.error(t('emptyXLSX'));

      importCSV({ items });
      toast.success(t('xlsxSuccess'));
    };

    reader.readAsArrayBuffer(file);
  };

  const handleFileChange = (file?: File) => {
    if (!file) {
      return toast.error(t('noFile'));
    }

    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!extension || !['csv', 'xlsx'].includes(extension)) {
      return toast.error(t('invalidExtension'));
    }

    extension === 'csv' ? handleCSV(file) : handleXLSX(file);
  };

  return (
    <div className='flex w-full justify-start sm:w-auto md:justify-center'>
      <input
        type='file'
        accept='.csv,.xlsx'
        hidden
        id='warehouse-csv'
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleFileChange(e.target.files[0]);
            e.target.value = '';
          }
        }}
      />

      <Button
        className='bg-primary h-10 w-[80%] md:w-full'
        disabled={loading}
        onClick={() => document.getElementById('warehouse-csv')?.click()}
      >
        {loading ? t('importing') : t('importButton')}
      </Button>
    </div>
  );
}
