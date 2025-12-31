import { warehouseService } from '@/services/warehouseItem';
import { useQuery } from '@tanstack/react-query';

interface UseGetAllWarehouseItemsParams {
  pageNumber?: number;
  pageSize?: number;
}

export const useGetAllWarehouseItems = ({
  pageNumber = 1,
  pageSize = 10
}: UseGetAllWarehouseItemsParams) => {
  return useQuery({
    queryKey: ['warehouse-items', pageNumber, pageSize],
    queryFn: () => warehouseService.getAllWarehouseItems(pageNumber, pageSize)
  });
};
