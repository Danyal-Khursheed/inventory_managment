'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Edit } from 'lucide-react';
import Spinner from '@/components/spinningLoading/Spinner';
import { useGetAllPickups } from '../hooks/useGetAllPickups';
import { PickupType } from '../types/types';
import EditPickupModal from './EditPickupModal';

const PickupCard: React.FC = () => {
  const [pickupName, setPickupName] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedPickup, setSelectedPickup] = useState<PickupType | null>(null);

  const { data, isLoading } = useGetAllPickups({
    pageNumber: 1,
    pageSize: 50
  });

  const pickups: PickupType[] = (data?.data ?? []).map((item: any) => ({
    id: item.id,
    addressNick: item.addressNick,
    address: item.address,
    cityName: item.cityName,
    countryName: item.countryName,
    countryCode: item.countryCode,
    latitude: item.latitude,
    longitude: item.longitude
  }));

  return (
    <>
      <Card className='flex flex-col gap-18'>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle className='text-xl'>Pickup</CardTitle>
          <Edit
            size={20}
            className='cursor-pointer'
            onClick={() => selectedPickup && setOpenModal(true)}
          />
        </CardHeader>

        <CardContent className='space-y-3'>
          {pickupName && <p className='font-medium'>{pickupName}</p>}

          {isLoading ? (
            <Spinner />
          ) : (
            <Select
              onValueChange={(id) => {
                const found = pickups.find((p) => p.id === id);
                if (found) {
                  setSelectedPickup(found);
                  setPickupName(found.addressNick ?? '');
                }
              }}
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select Pickup Address' />
              </SelectTrigger>

              <SelectContent className='max-h-[200px] overflow-y-auto'>
                {pickups.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.addressNick}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </CardContent>
      </Card>

      <EditPickupModal
        open={openModal}
        onOpenChange={setOpenModal}
        defaultValues={selectedPickup}
        onSubmit={(data) => {
          console.log('Updated Pickup:', data);
          setSelectedPickup(data);
          setPickupName(data.addressNick ?? '');
          setOpenModal(false);
        }}
      />
    </>
  );
};

export default PickupCard;
