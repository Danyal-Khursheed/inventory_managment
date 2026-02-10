'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CreateReceiverModal, { ReceiverType } from './CreateReceiverModal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux-toolkit/store/store';
import { setReciever } from '@/redux-toolkit/reducers/order';
import { useTranslations } from 'next-intl';

const ReceiverCard: React.FC = () => {
  const dispatch = useDispatch();
  const t = useTranslations('ReceiverCard');

  // 🔹 Get persisted receiver from Redux
  const savedReceiver = useSelector((state: RootState) => state.order.reciever);

  // 🔹 Local state hydrated from Redux
  const [receiver, setReceiver] = useState<ReceiverType | null>(
    savedReceiver
      ? {
          name: savedReceiver.name,
          companyName: savedReceiver.company_name,
          email: savedReceiver.email,
          mobileNo: savedReceiver.phone_number
        }
      : null
  );

  // 🔹 Modal state
  const [openModal, setOpenModal] = useState(false);

  // 🔹 Persist selection to Redux whenever local state changes
  useEffect(() => {
    if (!receiver) return;

    dispatch(
      setReciever({
        name: receiver.name,
        company_name: receiver.companyName,
        email: receiver.email,
        phone_number: receiver.mobileNo
      })
    );
  }, [receiver, dispatch]);

  // 🔹 Sync from Redux when prefill runs (e.g. edit order)
  useEffect(() => {
    if (savedReceiver?.name || savedReceiver?.email) {
      setReceiver({
        name: savedReceiver.name,
        companyName: savedReceiver.company_name,
        email: savedReceiver.email,
        mobileNo: savedReceiver.phone_number
      });
    }
  }, [savedReceiver?.name, savedReceiver?.email]);

  return (
    <>
      <Card id='receiver-card'>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle className='text-xl'>{t('title')}</CardTitle>
          <Button size='lg' onClick={() => setOpenModal(true)}>
            {t('createNew')}
          </Button>
        </CardHeader>

        <CardContent className='space-y-4'>
          {receiver && (
            <div className='bg-muted/30 rounded-lg border p-4'>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                <Info label={t('name')} value={receiver.name} />
                <Info label={t('company')} value={receiver.companyName} />
                <Info label={t('email')} value={receiver.email} />
                <Info label={t('mobile')} value={receiver.mobileNo} />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 🔹 Receiver modal */}
      <CreateReceiverModal
        open={openModal}
        onOpenChange={setOpenModal}
        defaultValues={receiver}
        onSubmit={(data: ReceiverType) => {
          setReceiver(data);
          setOpenModal(false);
        }}
      />
    </>
  );
};

export default ReceiverCard;

// 🔹 Info component for displaying field
const Info = ({ label, value }: { label: string; value?: string | null }) => (
  <div>
    <p className='text-muted-foreground border-b pb-2 text-xs font-bold tracking-wider uppercase'>
      {label}
    </p>
    <p className='mt-2 text-sm text-gray-800'>
      {value ?? <span className='text-muted-foreground'>—</span>}
    </p>
  </div>
);
