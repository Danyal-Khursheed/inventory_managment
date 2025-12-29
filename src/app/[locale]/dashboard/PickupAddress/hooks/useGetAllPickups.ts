import { useQuery } from '@tanstack/react-query';
import { pickupService, PickupsResponse } from '@/services/pickup.service';

interface UseGetAllPickupsParams {
  pageNumber?: number;
  pageSize?: number;
}

export const useGetAllPickups = ({
  pageNumber = 1,
  pageSize = 10
}: UseGetAllPickupsParams) => {
  return useQuery<PickupsResponse>({
    queryKey: ['pickups', pageNumber, pageSize],
    queryFn: () => pickupService.getAllPickups(pageNumber, pageSize)
  });
};
