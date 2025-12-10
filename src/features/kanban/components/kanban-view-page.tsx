'use client';

import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { useTranslation } from 'react-i18next';

export default function KanbanViewPage() {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <div className='space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title={t('kanban_title')} />
        </div>

        <div>
          <Button variant='outline' type='submit' className='w-full'>
            {t('login_btn')} <br />
            {t('i am subhan')}
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
