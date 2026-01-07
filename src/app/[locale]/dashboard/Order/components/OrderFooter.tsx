'use client';

import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux-toolkit/store';

const OrderFooter: React.FC = () => {
  const origin = useSelector((state: RootState) => state.cart.origin);

  const handleNext = () => {
    console.log('Order Data:', { origin });
  };

  return (
    <div className='mt-4 flex items-center justify-end'>
      <Button size='lg' onClick={handleNext}>
        Next
      </Button>
    </div>
  );
};

export default OrderFooter;
