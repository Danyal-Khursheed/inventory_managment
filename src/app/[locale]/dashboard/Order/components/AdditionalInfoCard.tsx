'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const AdditionalInfoCard: React.FC = () => {
  const [cod, setCod] = useState<'yes' | 'no'>('yes');
  const [codAmount, setCodAmount] = useState('');
  const [referenceId, setReferenceId] = useState('');
  const [instructions, setInstructions] = useState('');

  return (
    <Card className='rounded-2xl bg-white'>
      <CardHeader>
        <CardTitle className='text-bg-primary/90 text-xl'>
          Additional Information
        </CardTitle>
      </CardHeader>

      <CardContent className='space-y-6'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <div className='space-y-3'>
            <Label className='text-sm font-medium text-gray-700'>
              Cash On Delivery (COD)?
            </Label>

            <div className='flex items-center gap-8'>
              <button
                type='button'
                onClick={() => setCod('yes')}
                className='flex items-center gap-2'
              >
                <span
                  className={cn(
                    'flex h-5 w-5 items-center justify-center rounded-full border',
                    cod === 'yes'
                      ? 'border-bg-gray-200 bg-gray-100'
                      : 'border-gray-300'
                  )}
                >
                  {cod === 'yes' && (
                    <span className='h-3 w-3 rounded-full bg-gray-500' />
                  )}
                </span>
                <span
                  className={cn(
                    'text-sm',
                    cod === 'yes'
                      ? 'text-bg-primary/90 font-medium'
                      : 'text-gray-500'
                  )}
                >
                  Yes
                </span>
              </button>

              <button
                type='button'
                onClick={() => setCod('no')}
                className='flex items-center gap-2'
              >
                <span
                  className={cn(
                    'flex h-5 w-5 items-center justify-center rounded-full border',
                    cod === 'no'
                      ? 'border-bg-gray-200 bg-gray-100'
                      : 'border-gray-300'
                  )}
                >
                  {cod === 'no' && (
                    <span className='h-3 w-3 rounded-full bg-gray-500' />
                  )}
                </span>
                <span
                  className={cn(
                    'text-sm',
                    cod === 'no'
                      ? 'text-bg-primary/90 font-medium'
                      : 'text-gray-500'
                  )}
                >
                  No
                </span>
              </button>
            </div>
          </div>

          <div className='space-y-3'>
            <Label className='text-sm font-medium text-gray-700'>
              Reference ID (Optional)
            </Label>
            <Input
              placeholder='Reference ID'
              value={referenceId}
              onChange={(e) => setReferenceId(e.target.value)}
              className='focus-visible:gray-200 h-11 border-gray-300'
            />
          </div>
        </div>

        {cod === 'yes' && (
          <div className='space-y-3'>
            <Label className='text-sm font-medium text-gray-700'>
              COD Amount in <span className='text-gray-500'>*</span>
            </Label>
            <Input
              placeholder='Enter amount'
              value={codAmount}
              onChange={(e) => setCodAmount(e.target.value)}
              className='focus-visible:gray-200 h-11 border-gray-400'
            />
          </div>
        )}

        <div className='space-y-3'>
          <Label className='text-sm font-medium text-gray-700'>
            Instructions (Optional)
          </Label>
          <Input
            placeholder='Type any special request here (optional)'
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className='h-14 rounded-xl border-gray-300'
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AdditionalInfoCard;
