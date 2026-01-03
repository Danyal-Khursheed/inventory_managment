'use client';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { useTranslations } from 'next-intl';
import { useImportWarehouseCSV } from '../hooks/useImportWarehouseCSV';

export type WarehouseCSV = {
  name: string;
  pricePerItem: number;
  weightPerItem: number;
  quantity: number;
  warehouseId: string;
};

interface Props {
  onSuccess?: () => void;
}

const REQUIRED_KEYS = [
  'name',
  'pricePerItem',
  'quantity',
  'weightPerItem',
  'warehouseId'
];

const isValidUUID = (value: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);

type ValidationErrorKey =
  | 'missingColumn'
  | 'invalidName'
  | 'invalidPrice'
  | 'invalidQuantity'
  | 'invalidWeight'
  | 'invalidWarehouseId';

const validateRow = (
  row: any,
  rowIndex: number
): { key: ValidationErrorKey; row: number } | null => {
  for (const key of REQUIRED_KEYS) {
    if (!(key in row)) {
      return { key: 'missingColumn', row: rowIndex + 1 };
    }
  }

  if (!row.name || typeof row.name !== 'string') {
    return { key: 'invalidName', row: rowIndex + 1 };
  }

  if (isNaN(Number(row.pricePerItem))) {
    return { key: 'invalidPrice', row: rowIndex + 1 };
  }

  if (isNaN(Number(row.quantity))) {
    return { key: 'invalidQuantity', row: rowIndex + 1 };
  }

  if (isNaN(Number(row.weightPerItem))) {
    return { key: 'invalidWeight', row: rowIndex + 1 };
  }

  if (!isValidUUID(row.warehouseId)) {
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
        if (result.errors.length) {
          return toast.error(t('invalidFormat'));
        }

        if (!result.data.length) {
          return toast.error(t('emptyCSV'));
        }

        for (let i = 0; i < result.data.length; i++) {
          const error = validateRow(result.data[i], i);
          if (error) {
            return showRowError(error.key, error.row);
          }
        }

        const mappedData: WarehouseCSV[] = result.data.map((row: any) => ({
          name: row.name.trim(),
          pricePerItem: Number(row.pricePerItem),
          quantity: Number(row.quantity),
          weightPerItem: Number(row.weightPerItem),
          warehouseId: row.warehouseId
        }));

        importCSV(mappedData);
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

      const rawData = XLSX.utils.sheet_to_json<any>(worksheet, {
        defval: ''
      });

      if (!rawData.length) {
        return toast.error(t('emptyXLSX'));
      }

      const data: WarehouseCSV[] = [];

      for (let i = 0; i < rawData.length; i++) {
        const row = {
          name: rawData[i].name ?? rawData[i].Name,
          pricePerItem: rawData[i].pricePerItem ?? rawData[i].PricePerItem,
          quantity: rawData[i].quantity ?? rawData[i].Quantity,
          weightPerItem: rawData[i].weightPerItem ?? rawData[i].WeightPerItem,
          warehouseId:
            rawData[i].warehouseId ??
            rawData[i].WarehouseId ??
            rawData[i].warehouseid
        };

        const error = validateRow(row, i);
        if (error) {
          return showRowError(error.key, error.row);
        }

        data.push({
          name: row.name.trim(),
          pricePerItem: Number(row.pricePerItem),
          quantity: Number(row.quantity),
          weightPerItem: Number(row.weightPerItem),
          warehouseId: row.warehouseId
        });
      }

      importCSV(data);
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
    <div className='flex w-full justify-center sm:w-auto sm:justify-start'>
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
        className='bg-primary w-full'
        disabled={loading}
        onClick={() => document.getElementById('warehouse-csv')?.click()}
      >
        {loading ? t('importing') : t('importButton')}
      </Button>
    </div>
  );
}
