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
import { useCountryOrigin } from '../hooks';
import Spinner from '@/components/spinningLoading/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { setCountryOrigin } from '@/redux-toolkit/reducers/order';
import { RootState } from '@/redux-toolkit/store/store';
import { OriginType } from './EditOriginModal';
import { useTranslations } from 'next-intl';

const OriginCard: React.FC = () => {
  const dispatch = useDispatch();

  const t = useTranslations('OriginCard');
  const tCommon = useTranslations('common');

  // Get saved origin from Redux
  const savedOrigin = useSelector(
    (state: RootState) => state.order.country_origin
  );

  // Local state
  const [selectedOrigin, setSelectedOrigin] = useState<OriginType | null>(
    savedOrigin && savedOrigin.id
      ? {
          id: savedOrigin.id,
          companyName: savedOrigin.companyName ?? '',
          addressNick: savedOrigin.addressNick ?? '',
          addressLine1: savedOrigin.addressLine1 ?? '',
          cityName: savedOrigin.cityName ?? '',
          countryName: savedOrigin.countryName ?? '',
          countryCode: savedOrigin.countryCode ?? '',
          zipCode: savedOrigin.zipCode ?? '',
          latitude: savedOrigin.latitude ?? 0,
          longitude: savedOrigin.longitude ?? 0,
          phoneCode: savedOrigin.phoneCode ?? '',
          mobileNo: savedOrigin.mobileNo ?? ''
        }
      : null
  );

  // Fetch origins
  const { data, isLoading } = useCountryOrigin(1, 10);

  const origins: OriginType[] = (data?.data ?? []).map((item: any) => ({
    id: item.id ?? `unknown-${Math.random().toString(36).substr(2, 9)}`,
    companyName: item.companyName ?? '',
    addressNick: item.addressNick ?? '',
    addressLine1: item.addressLine1 ?? '',
    cityName: item.cityName ?? '',
    countryName: item.countryName ?? '',
    countryCode: item.countryCode ?? '',
    zipCode: item.zipCode ?? '',
    latitude: Number(item.latitude) || 0,
    longitude: Number(item.longitude) || 0,
    phoneCode: item.phoneCode ?? '',
    mobileNo: item.mobileNo ?? ''
  }));

  // Update Redux whenever selectedOrigin changes
  useEffect(() => {
    if (selectedOrigin) {
      dispatch(
        setCountryOrigin({
          id: selectedOrigin.id,
          companyName: selectedOrigin.companyName ?? '',
          addressNick: selectedOrigin.addressNick ?? '',
          addressLine1: selectedOrigin.addressLine1 ?? '',
          cityName: selectedOrigin.cityName ?? '',
          countryName: selectedOrigin.countryName ?? '',
          countryCode: selectedOrigin.countryCode ?? '',
          zipCode: selectedOrigin.zipCode ?? '',
          latitude: Number(selectedOrigin.latitude) || 0,
          longitude: Number(selectedOrigin.longitude) || 0,
          phoneCode: selectedOrigin.phoneCode ?? '',
          mobileNo: selectedOrigin.mobileNo ?? ''
        })
      );
    }
  }, [selectedOrigin, dispatch]);

  // Sync from Redux when prefill runs (e.g. edit order)
  useEffect(() => {
    if (savedOrigin?.id) {
      setSelectedOrigin({
        id: savedOrigin.id,
        companyName: savedOrigin.companyName ?? '',
        addressNick: savedOrigin.addressNick ?? '',
        addressLine1: savedOrigin.addressLine1 ?? '',
        cityName: savedOrigin.cityName ?? '',
        countryName: savedOrigin.countryName ?? '',
        countryCode: savedOrigin.countryCode ?? '',
        zipCode: savedOrigin.zipCode ?? '',
        latitude: savedOrigin.latitude ?? 0,
        longitude: savedOrigin.longitude ?? 0,
        phoneCode: savedOrigin.phoneCode ?? '',
        mobileNo: savedOrigin.mobileNo ?? ''
      });
    }
  }, [savedOrigin?.id]);

  return (
    <Card id='origin-card'>
      <CardHeader>
        <CardTitle className='text-xl'>{t('title')}</CardTitle>
      </CardHeader>

      <CardContent className='space-y-4'>
        {/* Selected origin details */}
        {selectedOrigin && (
          <div className='bg-muted/30 grid grid-cols-1 gap-4 rounded-lg border p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            <div>
              <p className='text-xs font-bold uppercase'>{t('nickname')}</p>
              <p>{selectedOrigin.addressNick || '—'}</p>
            </div>

            <div>
              <p className='text-xs font-bold uppercase'>{t('company')}</p>
              <p>{selectedOrigin.companyName || '—'}</p>
            </div>

            <div>
              <p className='text-xs font-bold uppercase'>{t('country')}</p>
              <p>{selectedOrigin.countryName || '—'}</p>
            </div>

            <div>
              <p className='text-xs font-bold uppercase'>{t('mobile')}</p>
              <p>
                {selectedOrigin.phoneCode && selectedOrigin.mobileNo
                  ? `${selectedOrigin.phoneCode} ${selectedOrigin.mobileNo}`
                  : '—'}
              </p>
            </div>
          </div>
        )}

        {/* Select dropdown */}
        <Select
          disabled={isLoading}
          value={selectedOrigin?.id}
          onValueChange={(id: string) => {
            const found = origins.find((o) => o.id === id);
            if (found) {
              setSelectedOrigin(found);
            }
          }}
        >
          <SelectTrigger className='w-full'>
            <SelectValue
              placeholder={selectedOrigin?.companyName || t('selectOrigin')}
            />
          </SelectTrigger>

          <SelectContent className='max-h-[calc(8*2.5rem)] overflow-y-auto'>
            {isLoading ? (
              <div className='flex items-center justify-center py-4'>
                <Spinner />
              </div>
            ) : origins.length > 0 ? (
              origins.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.companyName}
                </SelectItem>
              ))
            ) : (
              <div className='text-muted-foreground px-3 py-2 text-sm'>
                {tCommon('noRecordsFound')}
              </div>
            )}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default OriginCard;
