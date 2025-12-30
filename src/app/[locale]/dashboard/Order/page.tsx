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
    <div className='min-h-screen'>
      {/* <h1 className="mb-2 text-2xl font-semibold text-bg-primary">
        CREATE ORDER
      </h1> */}
      <HeaderHero
        componentName='Create Order'
        // buttonName='Create PickUp'
        // handleButton={setCreateOpen}
      />
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <OriginCard />
        <ReceiverCard />
        <PickupCard />
        <AdditionalInfoCard />
      </div>

      <PackageSection />
      {/* <OrderFooter /> */}
    </div>
  );
};

export default Page;
