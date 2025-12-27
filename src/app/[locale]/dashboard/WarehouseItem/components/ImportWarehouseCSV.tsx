'use client';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { useImportWarehouseCSV } from '../hooks/useImportWarehouseCSV';

export type WarehouseCSV = {
  name: string;
  price: number;
  quantity: number;
  weight: number;
  warehouseId: string;
};

interface Props {
  onSuccess?: () => void;
}

/* =========================
   VALIDATION HELPERS
========================= */

const REQUIRED_KEYS = ['name', 'price', 'quantity', 'weight', 'warehouseid'];

const isValidUUID = (value: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);

const validateRow = (row: any, index: number): string | null => {
  for (const key of REQUIRED_KEYS) {
    if (!(key in row)) {
      return `Row ${index + 1}: Missing column "${key}"`;
    }
  }

  if (!row.name || typeof row.name !== 'string') {
    return `Row ${index + 1}: Invalid name`;
  }

  if (isNaN(Number(row.price))) {
    return `Row ${index + 1}: Invalid price`;
  }

  if (isNaN(Number(row.quantity))) {
    return `Row ${index + 1}: Invalid quantity`;
  }

  if (isNaN(Number(row.weight))) {
    return `Row ${index + 1}: Invalid weight`;
  }

  if (!isValidUUID(row.warehouseid)) {
    return `Row ${index + 1}: Invalid warehouseId (UUID required)`;
  }

  return null;
};

export default function ImportWarehouseCSV({ onSuccess }: Props) {
  const { importCSV, loading } = useImportWarehouseCSV(onSuccess);

  /* =========================
     CSV HANDLER
  ========================= */

  const handleCSV = (file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim().toLowerCase(),
      complete: (result) => {
        if (result.errors.length) {
          return toast.error(result.errors[0].message);
        }

        if (!result.data.length) {
          return toast.error('CSV file is empty');
        }

        for (let i = 0; i < result.data.length; i++) {
          const error = validateRow(result.data[i], i);
          if (error) return toast.error(error);
        }

        const mappedData: WarehouseCSV[] = result.data.map((row: any) => ({
          name: row.name.trim(),
          price: Number(row.price),
          quantity: Number(row.quantity),
          weight: Number(row.weight),
          warehouseId: row.warehouseid
        }));

        importCSV(mappedData);
        toast.success('CSV imported successfully');
      }
    });
  };

  /* =========================
     XLSX HANDLER
  ========================= */

  const handleXLSX = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const buffer = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(buffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const rawData = XLSX.utils.sheet_to_json<any>(worksheet, { defval: '' });

      if (!rawData.length) {
        return toast.error('XLSX file is empty');
      }

      const data: WarehouseCSV[] = [];

      for (let i = 0; i < rawData.length; i++) {
        const row = {
          name: rawData[i].name ?? rawData[i].Name,
          price: rawData[i].price ?? rawData[i].Price,
          quantity: rawData[i].quantity ?? rawData[i].Quantity,
          weight: rawData[i].weight ?? rawData[i].Weight,
          warehouseid:
            rawData[i].warehouseId ??
            rawData[i].WarehouseId ??
            rawData[i].warehouseid
        };

        const error = validateRow(row, i);
        if (error) return toast.error(error);

        data.push({
          name: row.name,
          price: Number(row.price),
          quantity: Number(row.quantity),
          weight: Number(row.weight),
          warehouseId: row.warehouseid
        });
      }

      importCSV(data);
      toast.success('XLSX imported successfully');
    };

    reader.readAsArrayBuffer(file);
  };

  /* =========================
     FILE VALIDATION
  ========================= */

  const handleFileChange = (file: File) => {
    if (!file) return toast.error('No file selected');

    if (!file.name.match(/\.(csv|xlsx)$/i)) {
      return toast.error('Only CSV or XLSX files are allowed');
    }

    file.name.endsWith('.csv') ? handleCSV(file) : handleXLSX(file);
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
        variant='outline'
        disabled={loading}
        onClick={() => document.getElementById('warehouse-csv')?.click()}
      >
        {loading ? 'Importing...' : 'Import CSV / XLSX'}
      </Button>
    </div>
  );
}
