import api from '@/lib/api';

export interface StatisticsOverview {
  statistics: {
    totalOrders: number;
    pendingOrders: number;
    completedOrders: number;
    totalWarehouses: number;
    totalWarehouseItems: number;
    totalCountryOrigins: number;
    totalPickupAddresses: number;
  };
}

export const statisticsService = {
  getOverview: async (): Promise<StatisticsOverview> => {
    const { data } = await api.get<StatisticsOverview>(
      '/orders/statistics/overview'
    );
    return data;
  }
};
