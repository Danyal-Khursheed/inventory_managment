'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CreateReceiverModal, { ReceiverType } from './CreateReceiverModal';

interface ReceiverCardProps {
  receiver: ReceiverType | null;
  setReceiver: React.Dispatch<React.SetStateAction<ReceiverType | null>>;
}

const ReceiverCard: React.FC<ReceiverCardProps> = ({
  receiver,
  setReceiver
}) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle className='text-xl'>Receiver</CardTitle>

          <Button size='lg' onClick={() => setOpenModal(true)}>
            Create new
          </Button>
        </CardHeader>

        <CardContent className='space-y-4'>
          {receiver && (
            <div className='bg-muted/30 rounded-lg border p-4'>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                <Info label='Name' value={receiver.name} />
                <Info label='Company' value={receiver.companyName} />
                <Info label='Email' value={receiver.email} />
                <Info label='Mobile No' value={receiver.mobileNo} />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <CreateReceiverModal
        open={openModal}
        onOpenChange={setOpenModal}
        onSubmit={(data) => {
          setReceiver(data);
          setOpenModal(false);
        }}
      />
    </>
  );
};

export default ReceiverCard;

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
