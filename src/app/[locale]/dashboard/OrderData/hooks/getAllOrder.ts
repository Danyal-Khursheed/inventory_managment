import { orderService } from '@/services/orderService';
import { useQuery } from '@tanstack/react-query';

interface GetAllOrdersParams {
  pageNumber?: number;
  pageSize?: number;
}

export const useGetAllOrders = ({
  pageNumber = 1,
  pageSize = 10
}: GetAllOrdersParams) => {
  return useQuery({
    queryKey: ['orders', pageNumber, pageSize],
    queryFn: () => orderService.getAll(pageNumber, pageSize)
  });
};
