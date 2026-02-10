'use client';

import { useStatistics } from './hooks';
import { StatCard } from './components/StatCard';
import { OrdersChart } from './components/OrdersChart';
import { WarehouseChart } from './components/WarehouseChart';
import { OverviewChart } from './components/OverviewChart';
import {
  ShoppingCart,
  Package,
  Warehouse,
  MapPin,
  Globe,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import HeaderHero from './components/HeaderHero';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function StatisticsPage() {
  const t = useTranslations('StatisticsPage');
  const { data, isLoading, error } = useStatistics();
  const router = useRouter();

  const handleCreateOrder = () => {
    router.push('/dashboard/Order');
  };

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {[...Array(7)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className='h-4 w-24' />
              </CardHeader>
              <CardContent>
                <Skeleton className='h-8 w-16' />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className='grid gap-4 md:grid-cols-2'>
          <Card>
            <CardHeader>
              <Skeleton className='h-6 w-32' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-[300px]' />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className='h-6 w-32' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-[300px]' />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex h-[400px] items-center justify-center'>
        <div className='text-center'>
          <p className='text-destructive text-lg font-semibold'>
            {t('errorTitle')}
          </p>
          <p className='text-muted-foreground mt-2 text-sm'>
            {t('errorDescription')}
          </p>
        </div>
      </div>
    );
  }

  const stats = data?.statistics;
  if (!stats) return null;

  const overviewData = [
    { name: 'warehouses', value: stats.totalWarehouses },
    { name: 'items', value: stats.totalWarehouseItems },
    { name: 'countryOrigins', value: stats.totalCountryOrigins },
    { name: 'pickupAddresses', value: stats.totalPickupAddresses }
  ];

  return (
    <div className='space-y-6'>
      <HeaderHero buttonName='Create Order' handleButton={handleCreateOrder} />

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          title={t('totalOrders')}
          value={stats.totalOrders}
          icon={ShoppingCart}
          description={t('allTimeOrders')}
          delay={0}
          gradient='bg-blue-500'
          iconColor='bg-blue-500/10 text-blue-600 dark:text-blue-400'
        />

        <StatCard
          title={t('pendingOrders')}
          value={stats.pendingOrders}
          icon={Clock}
          description={t('awaitingProcessing')}
          delay={0.1}
          gradient='bg-yellow-500'
          iconColor='bg-yellow-500/10 text-yellow-600 dark:text-yellow-400'
        />

        <StatCard
          title={t('completedOrders')}
          value={stats.completedOrders}
          icon={CheckCircle2}
          description={t('successfullyProcessed')}
          delay={0.2}
          gradient='bg-green-500'
          iconColor='bg-green-500/10 text-green-600 dark:text-green-400'
        />

        <StatCard
          title={t('totalWarehouses')}
          value={stats.totalWarehouses}
          icon={Warehouse}
          description={t('activeWarehouses')}
          delay={0.3}
          gradient='bg-purple-500'
          iconColor='bg-purple-500/10 text-purple-600 dark:text-purple-400'
        />

        <StatCard
          title={t('warehouseItems')}
          value={stats.totalWarehouseItems}
          icon={Package}
          description={t('itemsInStock')}
          delay={0.4}
          gradient='bg-indigo-500'
          iconColor='bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
        />

        <StatCard
          title={t('countryOrigins')}
          value={stats.totalCountryOrigins}
          icon={Globe}
          description={t('availableOrigins')}
          delay={0.5}
          gradient='bg-teal-500'
          iconColor='bg-teal-500/10 text-teal-600 dark:text-teal-400'
        />

        <StatCard
          title={t('pickupAddresses')}
          value={stats.totalPickupAddresses}
          icon={MapPin}
          description={t('activeLocations')}
          delay={0.6}
          gradient='bg-pink-500'
          iconColor='bg-pink-500/10 text-pink-600 dark:text-pink-400'
        />
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <OrdersChart
          pendingOrders={stats.pendingOrders}
          completedOrders={stats.completedOrders}
          delay={0.7}
        />

        <WarehouseChart
          warehouses={stats.totalWarehouses}
          warehouseItems={stats.totalWarehouseItems}
          delay={0.8}
        />
      </div>

      <OverviewChart data={overviewData} delay={0.9} />
    </div>
  );
}
