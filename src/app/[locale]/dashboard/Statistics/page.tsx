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

export default function StatisticsPage() {
  const { data, isLoading, error } = useStatistics();

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
            Failed to load statistics
          </p>
          <p className='text-muted-foreground mt-2 text-sm'>
            Please try refreshing the page
          </p>
        </div>
      </div>
    );
  }

  const stats = data?.statistics;

  if (!stats) {
    return null;
  }

  const overviewData = [
    { name: 'Warehouses', value: stats.totalWarehouses },
    { name: 'Warehouse Items', value: stats.totalWarehouseItems },
    { name: 'Country Origins', value: stats.totalCountryOrigins },
    { name: 'Pickup Addresses', value: stats.totalPickupAddresses }
  ];

  return (
    <div className='space-y-6'>
      {/* Statistics Cards */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          title='Total Orders'
          value={stats.totalOrders}
          icon={ShoppingCart}
          description='All time orders'
          delay={0}
          gradient='bg-blue-500'
          iconColor='bg-blue-500/10 text-blue-600 dark:text-blue-400'
        />
        <StatCard
          title='Pending Orders'
          value={stats.pendingOrders}
          icon={Clock}
          description='Awaiting processing'
          delay={0.1}
          gradient='bg-yellow-500'
          iconColor='bg-yellow-500/10 text-yellow-600 dark:text-yellow-400'
        />
        <StatCard
          title='Completed Orders'
          value={stats.completedOrders}
          icon={CheckCircle2}
          description='Successfully processed'
          delay={0.2}
          gradient='bg-green-500'
          iconColor='bg-green-500/10 text-green-600 dark:text-green-400'
        />
        <StatCard
          title='Total Warehouses'
          value={stats.totalWarehouses}
          icon={Warehouse}
          description='Active warehouses'
          delay={0.3}
          gradient='bg-purple-500'
          iconColor='bg-purple-500/10 text-purple-600 dark:text-purple-400'
        />
        <StatCard
          title='Warehouse Items'
          value={stats.totalWarehouseItems}
          icon={Package}
          description='Items in stock'
          delay={0.4}
          gradient='bg-indigo-500'
          iconColor='bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
        />
        <StatCard
          title='Country Origins'
          value={stats.totalCountryOrigins}
          icon={Globe}
          description='Available origins'
          delay={0.5}
          gradient='bg-teal-500'
          iconColor='bg-teal-500/10 text-teal-600 dark:text-teal-400'
        />
        <StatCard
          title='Pickup Addresses'
          value={stats.totalPickupAddresses}
          icon={MapPin}
          description='Active locations'
          delay={0.6}
          gradient='bg-pink-500'
          iconColor='bg-pink-500/10 text-pink-600 dark:text-pink-400'
        />
      </div>

      {/* Charts Section */}
      <div className='grid gap-4 md:grid-cols-2'>
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

      {/* Overview Chart */}
      <OverviewChart data={overviewData} delay={0.9} />
    </div>
  );
}
