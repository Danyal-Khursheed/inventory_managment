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

          <Button size='lg' onClick={() => setOpenModal(true)}>
            Create new
          </Button>
        </CardHeader>

        <CardContent className='space-y-4'>
          {receiver && (
            <div className='bg-muted/30 rounded-lg border p-4'>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                <div className='group transition'>
                  <div className='border-b pb-2'>
                    <p className='text-muted-foreground text-xs font-bold tracking-wider uppercase'>
                      Name
                    </p>
                  </div>
                  <p className='mt-2 text-sm text-gray-800'>
                    {receiver.name ?? (
                      <span className='text-muted-foreground'>—</span>
                    )}
                  </p>
                </div>

                <div className='group transition'>
                  <div className='border-b pb-2'>
                    <p className='text-muted-foreground text-xs font-bold tracking-wider uppercase'>
                      Company
                    </p>
                  </div>
                  <p className='mt-2 text-sm text-gray-800'>
                    {receiver.companyName ?? (
                      <span className='text-muted-foreground'>—</span>
                    )}
                  </p>
                </div>

                <div className='group transition'>
                  <div className='border-b pb-2'>
                    <p className='text-muted-foreground text-xs font-bold tracking-wider uppercase'>
                      Email
                    </p>
                  </div>
                  <p className='mt-2 text-sm break-all text-gray-800'>
                    {receiver.email ?? (
                      <span className='text-muted-foreground'>—</span>
                    )}
                  </p>
                </div>

                <div className='group transition'>
                  <div className='border-b pb-2'>
                    <p className='text-muted-foreground text-xs font-bold tracking-wider uppercase'>
                      Mobile No
                    </p>
                  </div>
                  <p className='mt-2 text-sm text-gray-800'>
                    {receiver.mobileNo ?? (
                      <span className='text-muted-foreground'>—</span>
                    )}
                  </p>
                </div>
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
        }}
      />
    </>
  );
};

export default ReceiverCard;
