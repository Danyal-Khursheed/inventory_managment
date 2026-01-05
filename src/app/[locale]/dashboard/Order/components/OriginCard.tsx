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
import { useCountryOrigin } from '../hooks';
import EditOriginModal, { OriginType } from './EditOriginModal';
import Spinner from '@/components/spinningLoading/Spinner';

const OriginCard: React.FC = () => {
  const [originName, setOriginName] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrigin, setSelectedOrigin] = useState<OriginType | null>(null);

  const { data, isLoading } = useCountryOrigin(1, 50);

  const origins: OriginType[] = (data?.data ?? []).map((item: any) => ({
    id: item.id ?? `unknown-${Math.random().toString(36).substr(2, 9)}`,
    companyName: item.companyName ?? '',
    addressNick: item.addressNick,
    addressLine1: item.addressLine1,
    cityName: item.cityName,
    countryName: item.countryName,
    countryCode: item.countryCode,
    zipCode: item.zipCode,
    latitude: item.latitude,
    longitude: item.longitude,
    phoneCode: item.phoneCode,
    mobileNo: item.mobileNo
  }));

  return (
    <>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle className='text-xl'>Origin</CardTitle>
          <Edit
            size={20}
            className='cursor-pointer'
            onClick={() => selectedOrigin && setOpenModal(true)}
          />
        </CardHeader>

        <CardContent className='space-y-4'>
          {selectedOrigin && (
            <div className='bg-muted/30 grid grid-cols-1 gap-4 rounded-lg border p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
              <div className='group transition'>
                <div className='flex items-center justify-between border-b pb-2'>
                  <p className='text-muted-foreground text-xs font-bold tracking-wider uppercase'>
                    Nickname
                  </p>
                </div>
                <p className='mt-2 text-sm text-gray-800'>
                  {selectedOrigin.addressNick ?? (
                    <span className='text-muted-foreground'>—</span>
                  )}
                </p>
              </div>

              <div className='group transition'>
                <div className='flex items-center justify-between border-b pb-2'>
                  <p className='text-muted-foreground text-xs font-bold tracking-wider uppercase'>
                    Company
                  </p>
                </div>
                <p className='mt-2 text-sm text-gray-800'>
                  {selectedOrigin.companyName ?? (
                    <span className='text-muted-foreground'>—</span>
                  )}
                </p>
              </div>

              <div className='group transition'>
                <div className='flex items-center justify-between border-b pb-2'>
                  <p className='text-muted-foreground text-xs font-bold tracking-wider uppercase'>
                    Country
                  </p>
                </div>
                <p className='mt-2 text-sm text-gray-800'>
                  {selectedOrigin.countryName ?? (
                    <span className='text-muted-foreground'>—</span>
                  )}
                </p>
              </div>

              <div className='group transition'>
                <div className='flex items-center justify-between border-b pb-2'>
                  <p className='text-muted-foreground text-xs font-bold tracking-wider uppercase'>
                    Mobile No
                  </p>
                </div>
                <p className='mt-2 text-sm text-gray-800'>
                  {selectedOrigin?.phoneCode && selectedOrigin?.mobileNo ? (
                    `${selectedOrigin.phoneCode} ${selectedOrigin.mobileNo}`
                  ) : (
                    <span className='text-muted-foreground'>—</span>
                  )}
                </p>
              </div>
            </div>
          )}

          <Select
            disabled={isLoading}
            onValueChange={(id: string) => {
              const found = origins.find((o) => o.id === id);
              if (found) {
                setSelectedOrigin(found);
                setOriginName(found.companyName ?? '');
              }
            }}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select Origin' />
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
                  No origins found
                </div>
              )}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <EditOriginModal
        open={openModal}
        onOpenChange={setOpenModal}
        defaultValues={selectedOrigin}
        onSubmit={(data) => {
          setSelectedOrigin(data);
          setOriginName(data.companyName ?? '');
          setOpenModal(false);
        }}
      />
    </>
  );
};

export default OriginCard;
