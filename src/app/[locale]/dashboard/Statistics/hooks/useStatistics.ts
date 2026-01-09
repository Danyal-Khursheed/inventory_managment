'use client';

import { useQuery } from '@tanstack/react-query';
import { statisticsService } from '@/services/statistics.service';

export const useStatistics = () => {
  return useQuery({
    queryKey: ['statistics', 'overview'],
    queryFn: statisticsService.getOverview,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 10000 // Consider data stale after 10 seconds
  });
};
