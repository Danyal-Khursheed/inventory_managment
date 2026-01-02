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
  const [isCreating, setIsCreating] = useState(false);
  const t = useTranslations('headerHero');

  const createCountryOriginMutation = useCreateCountryOrigin();

  const handleCreate = async (data: any) => {
    try {
      setIsCreating(true);
      await createCountryOriginMutation.mutateAsync(data);
      setCreateModal(false);
      toast.success('Country region created successfully');
    } catch (error) {
      toast.error('An error occurred while creating the country region');
    } finally {
      setIsCreating(false);
    }
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
        loading={isCreating}
      />

      <CountryRegionTable />
    </>
  );
}
