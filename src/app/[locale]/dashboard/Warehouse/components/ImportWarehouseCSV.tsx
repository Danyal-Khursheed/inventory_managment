'use client';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Papa from 'papaparse';
import { useImportWarehouseCSV } from '../hook/useImportWarehouseCSV';

export type WarehouseCSV = {
  name: string;
  country: string;
  city: string;
  address: string;
};

interface Props {
  onSuccess: () => void;
}

export default function ImportWarehouseCSV({ onSuccess }: Props) {
  const { importCSV, loading } = useImportWarehouseCSV(onSuccess);

  const handleFileChange = (file: File) => {
    if (!file) return toast.error('No file selected');

    if (!file.name.match(/\.(csv|xlsx)$/i))
      return toast.error('Only CSV or XLSX files are allowed');

    if (file.name.endsWith('.csv')) {
      Papa.parse<WarehouseCSV>(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          if (result.errors.length > 0) {
            console.error('CSV parse errors', result.errors);
            return toast.error(`CSV has errors: ${result.errors[0].message}`);
          }

          const data = result.data;
          if (data.length === 0) return toast.error('CSV file is empty');

          // Validate rows
          const invalidRows: number[] = [];
          const isValid = data.every((row, i) => {
            const valid =
              row.name?.trim() &&
              row.country?.trim() &&
              row.city?.trim() &&
              row.address?.trim();
            if (!valid) invalidRows.push(i + 2);
            return valid;
          });

          if (!isValid)
            return toast.error(`Invalid rows: ${invalidRows.join(', ')}`);

          // Call API
          importCSV(data);
        }
      });
    } else {
      toast.success('XLSX file selected (parsing not implemented yet)');
    }
  };

  return (
    <div className='flex w-full justify-center sm:w-auto sm:justify-start'>
      <input
        type='file'
        accept='.csv,.xlsx'
        hidden
        id='warehouse-csv'
        onChange={(e) => {
          if (e.target.files) {
            handleFileChange(e.target.files[0]);
            e.target.value = '';
          }
        }}
      />

      <Button
        variant='outline'
        className='border-primary/90 hover:bg-primary/90 w-full px-4 py-2 text-sm text-black hover:text-white sm:w-auto'
        onClick={() => document.getElementById('warehouse-csv')?.click()}
        disabled={loading}
      >
        {loading ? 'Importing...' : 'Import CSV/XLSX'}
      </Button>
    </div>
  );
}
