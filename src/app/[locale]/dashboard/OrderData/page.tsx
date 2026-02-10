'use client';

import { useRouter } from 'next/navigation';
import HeaderHero from './components/HeaderHero';
import OrderDataTable from './components/OrderDataTable';
import { useDispatch } from 'react-redux';
import { clearOrder } from '@/redux-toolkit/reducers/order';

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleCreateOrder = () => {
    dispatch(clearOrder());
    router.push('/dashboard/Order');
  };

  return (
    <div className='space-y-6 px-4'>
      <HeaderHero
        componentName='Order Data'
        buttonName='Create Order'
        handleButton={handleCreateOrder}
      />

      <OrderDataTable />
    </div>
  );
};

export default Page;
