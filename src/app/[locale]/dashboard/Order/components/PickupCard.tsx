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
import { useTranslations, useLocale } from 'next-intl';

const PickupCard: React.FC = () => {
  const dispatch = useDispatch();
  const t = useTranslations('PickupCard');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  /* 🔹 Get persisted pickup from Redux */
  const savedPickup = useSelector(
    (state: RootState) => state.order.pickup_address
  );

  /* 🔹 Local state */
  const [selectedPickup, setSelectedPickup] = useState<PickupAddress | null>(
    savedPickup ? { ...savedPickup } : null
  );

  /* 🔹 Fetch pickups */
  const { data, isLoading } = useGetAllPickups({ pageNumber: 1, pageSize: 10 });

  /* 🔹 Normalize API response */
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
  }, [selectedPickup, dispatch]);

  return (
    <Card
      id='pickup-card'
      className='flex flex-col'
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <CardHeader>
        <CardTitle className='text-xl'>{t('title')}</CardTitle>
      </CardHeader>

      <CardContent className='space-y-4'>
        {selectedPickup && (
          <div className='bg-muted/30 rounded-lg border p-4'>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
              <Info label={t('nickname')} value={selectedPickup.addressNick} />
              <Info label={t('address')} value={selectedPickup.address} />
              <Info label={t('city')} value={selectedPickup.cityName} />
              <Info label={t('country')} value={selectedPickup.countryName} />
            </div>
          </div>
        )}

        <Select
          disabled={isLoading}
          value={selectedPickup?.id}
          onValueChange={(id: string) => {
            const found = pickups.find((p) => p.id === id);
            if (found) setSelectedPickup(found);
          }}
        >
          <SelectTrigger className='w-full'>
            <SelectValue
              placeholder={
                selectedPickup?.addressNick || t('selectPlaceholder')
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
                {t('noRecordsFound')}
              </div>
            )}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default PickupCard;

/* 🔹 Info component */
const Info = ({ label, value }: { label: string; value?: string | null }) => (
  <div>
    <p className='text-xs font-bold uppercase'>{label}</p>
    <p>{value ?? <span className='text-muted-foreground'>—</span>}</p>
  </div>
);
