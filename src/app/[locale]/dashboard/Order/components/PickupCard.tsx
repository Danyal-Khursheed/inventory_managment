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
  const [openModal, setOpenModal] = useState(false);
  const [selectedPickup, setSelectedPickup] = useState<PickupType | null>(null);

  const { data, isLoading } = useGetAllPickups({
    pageNumber: 1,
    pageSize: 10
  });

  const pickups: PickupType[] = (data?.data ?? []).map((item: any) => ({
    id: item.id,
    addressNick: item.addressNick,
    address: item.address,
    cityName: item.cityName,
    countryName: item.countryName,
    countryCode: item.countryCode,
    latitude: item.latitude,
    longitude: item.longitude,
    mobileNo: item.mobileNo
  }));

  return (
    <>
      <Card className='flex flex-col'>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle className='text-xl'>Pickup</CardTitle>
          <Edit
            size={20}
            className='cursor-pointer'
            onClick={() => selectedPickup && setOpenModal(true)}
          />
        </CardHeader>

        <CardContent className='space-y-4'>
          {selectedPickup && (
            <div className='bg-muted/30 rounded-lg border p-4'>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                <div className='group transition'>
                  <div className='border-b pb-2'>
                    <p className='text-muted-foreground text-xs font-bold tracking-wider uppercase'>
                      Nickname
                    </p>
                  </div>
                  <p className='mt-2 text-sm text-gray-800'>
                    {selectedPickup.addressNick ?? (
                      <span className='text-muted-foreground'>—</span>
                    )}
                  </p>
                </div>

                <div className='group transition'>
                  <div className='border-b pb-2'>
                    <p className='text-muted-foreground text-xs font-bold tracking-wider uppercase'>
                      Address
                    </p>
                  </div>
                  <p className='mt-2 text-sm text-gray-800'>
                    {selectedPickup.address ?? (
                      <span className='text-muted-foreground'>—</span>
                    )}
                  </p>
                </div>

                <div className='group transition'>
                  <div className='border-b pb-2'>
                    <p className='text-muted-foreground text-xs font-bold tracking-wider uppercase'>
                      City
                    </p>
                  </div>
                  <p className='mt-2 text-sm text-gray-800'>
                    {selectedPickup.cityName ?? (
                      <span className='text-muted-foreground'>—</span>
                    )}
                  </p>
                </div>

                <div className='group transition'>
                  <div className='border-b pb-2'>
                    <p className='text-muted-foreground text-xs font-bold tracking-wider uppercase'>
                      Country
                    </p>
                  </div>
                  <p className='mt-2 text-sm text-gray-800'>
                    {selectedPickup.countryName ?? (
                      <span className='text-muted-foreground'>—</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}

          <Select
            disabled={isLoading}
            onValueChange={(id) => {
              const found = pickups.find((p) => p.id === id);
              if (found) {
                setSelectedPickup(found);
              }
            }}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select Pickup Address' />
            </SelectTrigger>

            <SelectContent className='max-h-[200px] overflow-y-auto'>
              {isLoading ? (
                <div className='flex items-center justify-center py-4'>
                  <Spinner />
                </div>
              ) : pickups.length > 0 ? (
                pickups.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.addressNick}
                  </SelectItem>
                ))
              ) : (
                <div className='text-muted-foreground px-3 py-2 text-sm'>
                  No pickup addresses found
                </div>
              )}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <EditPickupModal
        open={openModal}
        onOpenChange={setOpenModal}
        defaultValues={selectedPickup}
        onSubmit={(data) => {
          setSelectedPickup(data);
          setOpenModal(false);
        }}
      />
    </>
  );
};

export default PickupCard;
