'use client';

import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  description?: string;
  delay?: number;
  gradient?: string;
  iconColor?: string;
}

export const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
  delay = 0,
  gradient,
  iconColor
}: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      className='h-full'
    >
      <Card className='border-border/50 bg-card relative h-full overflow-hidden transition-all duration-300 hover:shadow-lg'>
        {gradient && (
          <div className={cn('absolute inset-0 opacity-5', gradient)} />
        )}
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-muted-foreground text-sm font-medium'>
            {title}
          </CardTitle>
          <div
            className={cn(
              'rounded-lg p-2',
              iconColor || 'bg-primary/10 text-primary'
            )}
          >
            <Icon className='h-4 w-4' />
          </div>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.2 }}
          >
            <div className='text-2xl font-bold'>{value.toLocaleString()}</div>
            {description && (
              <p className='text-muted-foreground mt-1 text-xs'>
                {description}
              </p>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
