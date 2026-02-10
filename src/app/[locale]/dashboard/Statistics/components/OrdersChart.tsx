'use client';

import { motion } from 'motion/react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useTranslations, useLocale } from 'next-intl';

interface OrdersChartProps {
  pendingOrders: number;
  completedOrders: number;
  delay?: number;
}

const COLORS = {
  pending: 'var(--color-chart-1)',
  completed: 'var(--color-chart-2)'
};

export const OrdersChart = ({
  pendingOrders,
  completedOrders,
  delay = 0
}: OrdersChartProps) => {
  const t = useTranslations('OrdersChart');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const data = [
    {
      name: t('pending'),
      value: pendingOrders,
      fill: COLORS.pending
    },
    {
      name: t('completed'),
      value: completedOrders,
      fill: COLORS.completed
    }
  ];

  const chartConfig = {
    pending: {
      label: t('pending'),
      color: COLORS.pending
    },
    completed: {
      label: t('completed'),
      color: COLORS.completed
    }
  };

  return (
    <motion.div
      className='hidden md:block'
      dir={isRTL ? 'rtl' : 'ltr'}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className='h-full'>
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
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
                    isRTL
                      ? `${name} ${(percent * 100).toFixed(0)}٪`
                      : `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
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

          {/* Legend */}
          <div
            className={`mt-4 flex justify-center gap-6 ${
              isRTL ? 'flex-row-reverse' : ''
            }`}
          >
            {/* Pending */}
            <div
              className={`flex items-center gap-2 ${
                isRTL ? 'flex-row-reverse text-right' : ''
              }`}
            >
              <div
                className='h-3 w-3 rounded-full'
                style={{ backgroundColor: COLORS.pending }}
              />
              <span
                className='text-muted-foreground text-sm'
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                {t('pending')} {isRTL ? '' : ':'} {pendingOrders}
              </span>
            </div>

            {/* Completed */}
            <div
              className={`flex items-center gap-2 ${
                isRTL ? 'flex-row-reverse text-right' : ''
              }`}
            >
              <div
                className='h-3 w-3 rounded-full'
                style={{ backgroundColor: COLORS.completed }}
              />
              <span
                className='text-muted-foreground text-sm'
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                {t('completed')} {isRTL ? '' : ':'} {completedOrders}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
