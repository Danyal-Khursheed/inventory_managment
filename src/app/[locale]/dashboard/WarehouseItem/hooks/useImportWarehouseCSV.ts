'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { WarehouseCSVItem } from '../components/ImportWarehouseCSV';

/**
 * Bulk create warehouse items.
 * Payload: { items: WarehouseCSVItem[] }
 * Sends snake_case to API so backend can pick product_category, retrnxbox_damaged.
 */
export type ImportWarehouseCSVPayload = {
  items: WarehouseCSVItem[];
};

/** Convert bulk item to snake_case for API (backend may expect product_category, retrnxbox_damaged) */
function itemToSnakeCase(item: WarehouseCSVItem) {
  return {
    name: item.name,
    sku: item.sku,
    upc: item.upc,
    price_per_item: item.pricePerItem,
    weight_per_item: item.weightPerItem,
    quantity: item.quantity,
    warehouse_id: item.warehouseId,
    product_category: item.productCategory || undefined,
    retrnxbox_damaged: item.retrnxboxDamaged ?? 0
  };
}

export function useImportWarehouseCSV(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  const token = localStorage.getItem('auth_token');

  const mutation = useMutation({
    mutationFn: async (payload: ImportWarehouseCSVPayload) => {
      const body = {
        items: payload.items.map(itemToSnakeCase)
      };
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/warehouse-items/create-warehouse-items-bulk`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(body)
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
