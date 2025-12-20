// hooks/useGetAllWarehouses.ts
import { useQuery } from '@tanstack/react-query';
import { warehouseService } from '@/services/warehouse.service';

interface UseGetAllWarehousesParams {
  pageNumber?: number;
  pageSize?: number;
}

export const useGetAllWarehouses = ({
  pageNumber = 1,
  pageSize = 10
}: UseGetAllWarehousesParams) => {
  return useQuery({
    queryKey: ['warehouses', pageNumber, pageSize],
    queryFn: () => warehouseService.getAllWarehouses(pageNumber, pageSize)
  });
};
