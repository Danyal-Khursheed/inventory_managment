'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { WarehouseCSV } from '../components/ImportWarehouseCSV';

export function useImportWarehouseCSV(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);

  const importCSV = async (data: WarehouseCSV[]) => {
    try {
      setLoading(true);

      const res = await fetch('/warehouse-items/create-warehouse-items-bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error('Import failed');

      toast.success('CSV imported successfully');
      onSuccess();
    } catch {
      toast.error('CSV import failed');
    } finally {
      setLoading(false);
    }
  };

  return { importCSV, loading };
}
