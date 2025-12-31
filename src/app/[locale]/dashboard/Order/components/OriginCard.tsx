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

  const { data, isLoading } = useCountryOrigin(1, 50); // fetch more if needed

  // Map API data to OriginType
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

        <CardContent className='space-y-3'>
          {originName && <p className='font-medium'>{originName}</p>}

          {isLoading ? (
            <div>
              <Spinner />
            </div>
          ) : (
            <Select
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
                {origins.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.companyName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </CardContent>
      </Card>

      <EditOriginModal
        open={openModal}
        onOpenChange={setOpenModal}
        defaultValues={selectedOrigin}
        onSubmit={(data) => {
          console.log('Updated Origin data @@@:', data);
          setSelectedOrigin(data);
          setOriginName(data.companyName ?? '');
          setOpenModal(false);
        }}
      />
    </>
  );
};

export default OriginCard;
