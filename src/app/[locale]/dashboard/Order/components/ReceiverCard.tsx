'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CreateReceiverModal, { ReceiverType } from './CreateReceiverModal';

const ReceiverCard: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [receiver, setReceiver] = useState<ReceiverType | null>(null);

  return (
    <>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle className='text-xl'>Receiver</CardTitle>

          <Button size='sm' onClick={() => setOpenModal(true)}>
            Create new
          </Button>
        </CardHeader>

        <CardContent>
          <div className='text-muted-foreground flex items-center gap-6 text-sm'>
            <span>{receiver?.name ?? 'Name'}</span>
            <span className='text-gray-400'>|</span>
            <span>{receiver?.companyName ?? 'Address'}</span>
          </div>
        </CardContent>
      </Card>

      <CreateReceiverModal
        open={openModal}
        onOpenChange={setOpenModal}
        onSubmit={(data) => {
          console.log(data);
          setReceiver(data);
        }}
      />
    </>
  );
};

export default ReceiverCard;
