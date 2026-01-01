'use client';

import AdditionalInfoCard from './components/AdditionalInfoCard';
import HeaderHero from './components/HeaderHero';
// import OrderFooter from "./components/OrderFooter";
import OriginCard from './components/OriginCard';
import PackageSection from './components/PackageSection';
import PickupCard from './components/PickupCard';
import ReceiverCard from './components/ReceiverCard';

const Page: React.FC = () => {
  return (
    <div className='mx-auto min-h-screen max-w-4xl px-4 py-2'>
      {/* Header Section */}
      <HeaderHero
        componentName='Create Order'
        // buttonName='Create PickUp'
        // handleButton={setCreateOpen}
      />

      {/* Form Section */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-1'>
        <OriginCard />
        <ReceiverCard />
        <PickupCard />
        <AdditionalInfoCard />
      </div>

      {/* Package Section */}
      <PackageSection />

      {/* Footer Section */}
      {/* <OrderFooter /> */}
    </div>
  );
};

export default Page;
