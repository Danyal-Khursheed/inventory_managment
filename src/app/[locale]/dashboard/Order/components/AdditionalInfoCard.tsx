'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux-toolkit/store/store';
import {
  setCod,
  setCodAmount,
  setReferenceId,
  setInstructions
} from '@/redux-toolkit/reducers/order';

const AdditionalInfoCard: React.FC = () => {
  const dispatch = useDispatch();

  // 🔹 Redux state
  const codState = useSelector((state: RootState) => state.order.cod);
  const codAmountState = useSelector(
    (state: RootState) => state.order.cod_amount
  );
  const referenceIdState = useSelector(
    (state: RootState) => state.order.reference_id
  );
  const instructionsState = useSelector(
    (state: RootState) => state.order.instructions
  );

  // 🔹 Local state hydrated from Redux
  const [cod, setCodLocal] = useState<'yes' | 'no'>(codState ? 'yes' : 'no');
  const [codAmount, setCodAmountLocal] = useState(codAmountState.toString());
  const [referenceId, setReferenceIdLocal] = useState(referenceIdState);
  const [instructions, setInstructionsLocal] = useState(instructionsState);

  // 🔹 Sync local state to Redux whenever it changes
  useEffect(() => {
    dispatch(setCod(cod === 'yes'));
    dispatch(setCodAmount(Number(codAmount) || 0));
    dispatch(setReferenceId(referenceId));
    dispatch(setInstructions(instructions));
  }, [cod, codAmount, referenceId, instructions, dispatch]);

  return (
    <Card className='rounded-2xl'>
      <CardHeader>
        <CardTitle className='text-bg-primary/90 text-xl'>
          Additional Information
        </CardTitle>
      </CardHeader>

      <CardContent className='space-y-6'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {/* 🔹 COD Selection */}
          <div className='space-y-3'>
            <Label className='text-sm font-medium text-gray-700'>
              Cash On Delivery (COD)?
            </Label>

            <div className='flex items-center gap-8'>
              <button
                type='button'
                onClick={() => setCodLocal('yes')}
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
                onClick={() => setCodLocal('no')}
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

          {/* 🔹 Reference ID */}
          <div className='space-y-3'>
            <Label className='text-sm font-medium text-gray-700'>
              Reference ID (Optional)
            </Label>
            <Input
              placeholder='Reference ID'
              value={referenceId}
              onChange={(e) => setReferenceIdLocal(e.target.value)}
              className='focus-visible:gray-200 h-11 border-gray-300'
            />
          </div>
        </div>

        {/* 🔹 COD Amount */}
        {cod === 'yes' && (
          <div className='space-y-3'>
            <Label className='text-sm font-medium text-gray-700'>
              COD Amount in <span className='text-gray-500'>*</span>
            </Label>
            <Input
              placeholder='Enter amount'
              value={codAmount}
              onChange={(e) => setCodAmountLocal(e.target.value)}
              className='focus-visible:gray-200 h-11 border-gray-400'
            />
          </div>
        )}

        {/* 🔹 Instructions */}
        <div className='space-y-3'>
          <Label className='text-sm font-medium text-gray-700'>
            Instructions (Optional)
          </Label>
          <Input
            placeholder='Type any special request here (optional)'
            value={instructions}
            onChange={(e) => setInstructionsLocal(e.target.value)}
            className='h-14 rounded-xl border-gray-300'
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AdditionalInfoCard;
