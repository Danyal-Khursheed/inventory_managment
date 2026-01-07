'use client';

import { useState } from 'react';
import AdditionalInfoCard from './components/AdditionalInfoCard';
import HeaderHero from './components/HeaderHero';
import OrderFooter from './components/OrderFooter';
import OriginCard from './components/OriginCard';
import PackageSection from './components/PackageSection';
import PickupCard from './components/PickupCard';
import ReceiverCard from './components/ReceiverCard';
import { ReceiverType } from './components/CreateReceiverModal';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux-toolkit/store/store';

const Page: React.FC = () => {
  const [receiver, setReceiver] = useState<ReceiverType | null>(null);
  const reciever = useSelector((state: RootState) => state.order);
  console.log(reciever, 'reciver');
  return (
    <div className='mx-auto min-h-screen max-w-4xl px-4 py-2'>
      <HeaderHero componentName='Create Order' />

      <div className='grid grid-cols-1 gap-6'>
        <OriginCard />

        <ReceiverCard receiver={receiver} setReceiver={setReceiver} />

        <PickupCard />
        <AdditionalInfoCard />
        <PackageSection />
        <OrderFooter />
      </div>
    </div>
  );
};

export default Page;
