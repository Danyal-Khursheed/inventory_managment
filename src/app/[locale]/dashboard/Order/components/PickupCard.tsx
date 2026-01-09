'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import Spinner from '@/components/spinningLoading/Spinner';
import { useGetAllPickups } from '../hooks/useGetAllPickups';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux-toolkit/store/store';
import { setPickupAddress } from '@/redux-toolkit/reducers/order';
import { PickupAddress } from '@/app/[locale]/dashboard/PickupAddress/types/types';

const PickupCard: React.FC = () => {
  const dispatch = useDispatch();

  /* 🔹 Get persisted pickup from Redux */
  const savedPickup = useSelector(
    (state: RootState) => state.order.pickup_address
  );

  /* 🔹 Local state uses SAME TYPE as Redux */
  const [selectedPickup, setSelectedPickup] = useState<PickupAddress | null>(
    savedPickup ? { ...savedPickup } : null
  );

  /* 🔹 Fetch pickups */
  const { data, isLoading } = useGetAllPickups({
    pageNumber: 1,
    pageSize: 10
  });

  /* 🔹 Normalize API response → PickupAddress */
  const pickups: PickupAddress[] = (data?.data ?? []).map((item: any) => ({
    id: String(item.id),
    addressNick: item.addressNick ?? '',
    address: item.address ?? '',
    cityName: item.cityName ?? '',
    countryName: item.countryName ?? '',
    countryCode: item.countryCode ?? '',
    zipCode: item.zipCode ?? '',
    latitude: String(item.latitude ?? ''),
    longitude: String(item.longitude ?? ''),
    mobileNo: String(item.mobileNo ?? '')
  }));

  /* 🔹 Persist to Redux */
  useEffect(() => {
    if (!selectedPickup) return;

    dispatch(setPickupAddress(selectedPickup));
    console.log('✅ Pickup saved to Redux:', selectedPickup);
  }, [selectedPickup, dispatch]);

  return (
    <Card className='flex flex-col'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle className='text-xl'>Pickup</CardTitle>
      </CardHeader>

      <CardContent className='space-y-4'>
        {selectedPickup && (
          <div className='bg-muted/30 rounded-lg border p-4'>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
              <div>
                <p className='text-xs font-bold uppercase'>Nickname</p>
                <p>{selectedPickup.addressNick || '—'}</p>
              </div>

              <div>
                <p className='text-xs font-bold uppercase'>Address</p>
                <p>{selectedPickup.address || '—'}</p>
              </div>

              <div>
                <p className='text-xs font-bold uppercase'>City</p>
                <p>{selectedPickup.cityName || '—'}</p>
              </div>

              <div>
                <p className='text-xs font-bold uppercase'>Country</p>
                <p>{selectedPickup.countryName || '—'}</p>
              </div>
            </div>
          </div>
        )}

        <Select
          disabled={isLoading}
          value={selectedPickup?.id}
          onValueChange={(id: string) => {
            const found = pickups.find((p) => p.id === id);
            if (found) {
              console.log('📌 Pickup selected:', found);
              setSelectedPickup(found);
            }
          }}
        >
          <SelectTrigger className='w-full'>
            <SelectValue
              placeholder={
                selectedPickup?.addressNick || 'Select Pickup Address'
              }
            />
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
  );
};

export default PickupCard;
