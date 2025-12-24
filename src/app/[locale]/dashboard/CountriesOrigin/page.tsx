import React from 'react';
import HeaderHero from './components/HeaderHero';

export default function Page() {
  interface HeaderHeroProps {
    componentName: string;
    buttonName: string;
    handleButton: React.Dispatch<React.SetStateAction<boolean | null>>;
  }
  return (
    <>
      <div>
        <p>i am the CountryOrigin page </p>
      </div>
      {/* <HeaderHero
          componentName='warehouseTitle'
          buttonName='createWarehouse'
        //   handleButton={setCreateOpen(null)}
        /> */}

      {/* <CreateNewWarehousePopUp
          open={createOpen}
          onOpenChange={setCreateOpen}
        /> */}
    </>
  );
}
