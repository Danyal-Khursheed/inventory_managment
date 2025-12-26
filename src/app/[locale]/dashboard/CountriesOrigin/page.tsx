'use client';

import { useState } from 'react';
import HeaderHero from './components/HeaderHero';
import CreateCountryRegionModal from './components/CreateCountryRegionModal';
import CountryRegionTable from './components/CountryRegionTable';
import { useCreateCountryOrigin } from './hook';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

export default function Page() {
  const [createModal, setCreateModal] = useState(false);
  const t = useTranslations('headerHero');

  const createCountryOriginMutation = useCreateCountryOrigin();

  const handleCreate = (data: any) => {
    console.log('FORM DATA:', data);

    createCountryOriginMutation
      .mutateAsync(data)
      .then((response) => {
        setCreateModal(false);
      })
      .catch((error) => {
        toast.error('An error occurred while creating the country region');
      });
  };

  return (
    <>
      <HeaderHero
        componentName='CountryTitle'
        buttonName='CountryNewCountry'
        handleButton={setCreateModal}
      />

      <CreateCountryRegionModal
        open={createModal}
        onOpenChange={setCreateModal}
        onSubmit={handleCreate}
      />

      <CountryRegionTable />
    </>
  );
}
