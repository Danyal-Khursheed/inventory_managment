'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { WarehouseCSV } from '../components/ImportWarehouseCSV';

export function useImportWarehouseCSV(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  const token = localStorage.getItem('auth_token');

  const mutation = useMutation({
    mutationFn: async (data: WarehouseCSV[]) => {
      console.log(' Sending data to API:', data);

      const payload = { items: data };

      const res = await fetch(
        'https://kingshipbackend-production.up.railway.app/api/warehouse-items/create-warehouse-items-bulk',
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
      console.log('📥 API response:', json);
      return json;
    },

    onSuccess: (response) => {
      toast.success('Warehouses imported successfully');
      console.log(' onSuccess API response:', response);
      queryClient.invalidateQueries({ queryKey: ['warehouses'] });
      onSuccess?.();
    },

    onError: (error: any) => {
      console.error(' API error:', error);
      toast.error(error.message || 'CSV/XLSX import failed');
    }
  });

  return {
    importCSV: mutation.mutate,
    loading: mutation.isPending
  };
}
