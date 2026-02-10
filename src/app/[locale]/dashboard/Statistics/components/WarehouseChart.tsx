'use client';

import { motion } from 'motion/react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { useTranslations, useLocale } from 'next-intl';

interface WarehouseChartProps {
  warehouses: number;
  warehouseItems: number;
  delay?: number;
}

export const WarehouseChart = ({
  warehouses,
  warehouseItems,
  delay = 0
}: WarehouseChartProps) => {
  const t = useTranslations('WarehouseChart');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const data = [
    { name: t('warehouses'), value: warehouses },
    { name: t('items'), value: warehouseItems }
  ];

  const chartConfig = {
    warehouses: {
      label: t('warehouses'),
      color: 'var(--color-chart-3)'
    },
    items: {
      label: t('items'),
      color: 'var(--color-chart-4)'
    }
  };

  return (
    <motion.div
      dir={isRTL ? 'rtl' : 'ltr'}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className='h-full'>
        <CardHeader className='px-3 sm:px-4 md:px-5'>
          <CardTitle className='text-sm sm:text-base md:text-lg'>
            {t('title')}
          </CardTitle>
        </CardHeader>

        <CardContent className='px-2 sm:px-3 md:px-4'>
          <ChartContainer
            config={chartConfig}
            className='h-[220px] w-full sm:h-[260px] md:h-[300px] lg:h-[340px] xl:h-[380px]'
          >
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart
                data={data}
                margin={{
                  top: 10,
                  left: isRTL ? 0 : -35,
                  right: isRTL ? -35 : 0
                }}
              >
                <XAxis
                  dataKey='name'
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis
                  orientation={isRTL ? 'right' : 'left'}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />

                <ChartTooltip content={<ChartTooltipContent />} />

                <Bar
                  dataKey='value'
                  radius={[8, 8, 0, 0]}
                  animationBegin={delay * 1000}
                  animationDuration={1000}
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === 0
                          ? 'var(--color-chart-3)'
                          : 'var(--color-chart-4)'
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};
