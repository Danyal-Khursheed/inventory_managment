'use client';

import { motion } from 'motion/react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface OrdersChartProps {
  pendingOrders: number;
  completedOrders: number;
  delay?: number;
}

const COLORS = {
  pending: 'var(--color-chart-1)',
  completed: 'var(--color-chart-2)'
};

const chartConfig = {
  pending: {
    label: 'Pending',
    color: 'var(--color-chart-1)'
  },
  completed: {
    label: 'Completed',
    color: 'var(--color-chart-2)'
  }
};

export const OrdersChart = ({
  pendingOrders,
  completedOrders,
  delay = 0
}: OrdersChartProps) => {
  const data = [
    { name: 'Pending', value: pendingOrders, fill: COLORS.pending },
    { name: 'Completed', value: completedOrders, fill: COLORS.completed }
  ];

  const total = pendingOrders + completedOrders;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className='h-full'>
        <CardHeader>
          <CardTitle>Orders Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className='h-[350px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={data}
                  cx='50%'
                  cy='50%'
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill='#8884d8'
                  dataKey='value'
                  animationBegin={delay * 1000}
                  animationDuration={1000}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className='mt-4 flex justify-center gap-6'>
            <div className='flex items-center gap-2'>
              <div
                className='h-3 w-3 rounded-full'
                style={{ backgroundColor: COLORS.pending }}
              />
              <span className='text-muted-foreground text-sm'>
                Pending: {pendingOrders}
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <div
                className='h-3 w-3 rounded-full'
                style={{ backgroundColor: COLORS.completed }}
              />
              <span className='text-muted-foreground text-sm'>
                Completed: {completedOrders}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
