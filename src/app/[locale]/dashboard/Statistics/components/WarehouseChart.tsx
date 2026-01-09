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

interface WarehouseChartProps {
  warehouses: number;
  warehouseItems: number;
  delay?: number;
}

const chartConfig = {
  warehouses: {
    label: 'Warehouses',
    color: 'var(--color-chart-3)'
  },
  items: {
    label: 'Warehouse Items',
    color: 'var(--color-chart-4)'
  }
};

export const WarehouseChart = ({
  warehouses,
  warehouseItems,
  delay = 0
}: WarehouseChartProps) => {
  const data = [
    { name: 'Warehouses', value: warehouses },
    { name: 'Items', value: warehouseItems }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Warehouses & Items</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className='h-[300px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis
                  dataKey='name'
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey='value'
                  radius={[8, 8, 0, 0]}
                  animationBegin={delay * 1000}
                  animationDuration={1000}
                >
                  {data.map((entry, index) => (
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
