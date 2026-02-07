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

interface OverviewChartProps {
  data: Array<{ name: string; value: number }>;
  delay?: number;
}

const COLORS = [
  'var(--color-chart-1)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-4)',
  'var(--color-chart-5)'
];

const chartConfig = {
  value: {
    label: 'Count'
  }
};

export const OverviewChart = ({ data, delay = 0 }: OverviewChartProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className='pb-20'>
        <Card className='h-full'>
          <CardHeader className='px-3 sm:px-4 md:px-5'>
            <CardTitle className='text-sm sm:text-base md:text-lg'>
              System Overview
            </CardTitle>
          </CardHeader>

          <CardContent className='px-2 sm:px-3 md:px-4'>
            <ChartContainer
              config={chartConfig}
              className='h-[220px] w-full sm:h-[260px] md:h-[300px] lg:h-[340px] xl:h-[380px]'
            >
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={data} margin={{ top: 10, left: -35 }}>
                  <XAxis
                    dataKey='name'
                    angle={-45}
                    textAnchor='end'
                    height={80}
                    tick={{
                      fill: 'hsl(var(--muted-foreground))',
                      fontSize: 12
                    }}
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
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};
