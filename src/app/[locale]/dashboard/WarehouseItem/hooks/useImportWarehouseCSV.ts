'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { WarehouseCSVItem } from '../components/ImportWarehouseCSV';

// New payload type
export type ImportWarehouseCSVPayload = {
  items: WarehouseCSVItem[];
};

export function useImportWarehouseCSV(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  const token = localStorage.getItem('auth_token');

  const mutation = useMutation({
    // Now mutationFn expects the correct payload
    mutationFn: async (payload: ImportWarehouseCSVPayload) => {
      const res = await fetch(
        'https://20.108.32.24:449/api/warehouse-items/create-warehouse-items-bulk',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Import failed');
      }

      const json = await res.json();
      return json;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['warehouses'] });
      onSuccess?.();
    },

    onError: (error: any) => {
      toast.error(error.message || 'CSV/XLSX import failed');
    }
  });

  return {
    importCSV: mutation.mutate, // now expects { items: WarehouseCSVItem[] }
    loading: mutation.isPending
  };
}
