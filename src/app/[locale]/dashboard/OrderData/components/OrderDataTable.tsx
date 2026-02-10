'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Edit, Trash2 } from 'lucide-react';

import TablePagination from '@/components/pagination/TablePagination';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

import { useGetAllOrders } from '../hooks/getAllOrder';
import { useGetOrderById } from '../hooks/useGetOrderById';

import SkeletonTable from '@/components/SkeletonLoading/TableSkelton';
import DeleteOrderModal from './DeleteOrderModal';

import { useDispatch } from 'react-redux';
import {
  clearOrder,
  setCountryOrigin,
  setPickupAddress,
  setWarehouse,
  setWarehouseItems
} from '@/redux-toolkit/reducers/order';

import { useRouter } from 'next/navigation';

const OrderDataTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const pageSize = 10;

  const locale = useLocale();
  const router = useRouter();
  const dispatch = useDispatch();
  const t = useTranslations('OrderTable');
  const isRTL = locale === 'ar';

  const { data, isLoading, isError } = useGetAllOrders({
    pageNumber: currentPage,
    pageSize
  });

  const orders = data?.data ?? [];

  const { data: orderByIdData } = useGetOrderById(orderId);

  useEffect(() => {
    if (data) {
      console.log('GET ALL Orders API:', data);
    }
  }, [data]);

  useEffect(() => {
    if (orderByIdData) {
      console.log('GET BY ID Order API:', orderByIdData);
    }
  }, [orderByIdData]);

  if (isLoading) return <SkeletonTable />;

  if (isError)
    return (
      <div className='flex h-40 items-center justify-center'>
        <p className='text-lg text-red-500'>{t('errorMessage')}</p>
      </div>
    );

  const handleEdit = (order: any) => {
    setOrderId(order.id);
    router.push(`/${locale}/dashboard/Order?mode=edit&id=${order.id}`);
  };

  const handleDeleteClick = (order: any) => {
    setSelectedOrder({
      id: order.id,
      name: order.pickupAddress?.addressNick ?? '-'
    });
    setDeleteModalOpen(true);
  };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      <div className='overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('sNo')}</TableHead>
              <TableHead>{t('originName')}</TableHead>
              <TableHead>{t('originCountry')}</TableHead>
              <TableHead>{t('receiverName')}</TableHead>
              <TableHead>{t('receiverContact')}</TableHead>
              <TableHead>{t('pickupName')}</TableHead>
              <TableHead>{t('pickupCountry')}</TableHead>
              <TableHead>{t('warehouseName')}</TableHead>
              <TableHead>{t('warehouseItem')}</TableHead>
              <TableHead>{t('quantity')}</TableHead>
              <TableHead className={isRTL ? 'text-start' : 'text-end'}>
                {t('actions')}
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={11}
                  className='text-muted-foreground h-24 text-center'
                >
                  {t('noRecordsFound')}
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order: any, idx: number) => (
                <TableRow key={order.id}>
                  <TableCell>
                    {(currentPage - 1) * pageSize + idx + 1}
                  </TableCell>
                  <TableCell>
                    {order.countryOrigin?.companyName ?? '-'}
                  </TableCell>
                  <TableCell>
                    {order.countryOrigin?.countryName ?? '-'}
                  </TableCell>
                  <TableCell>
                    {order.pickupAddress?.addressNick ?? '-'}
                  </TableCell>
                  <TableCell>{order.pickupAddress?.mobileNo ?? '-'}</TableCell>
                  <TableCell>{order.pickupAddress?.address ?? '-'}</TableCell>
                  <TableCell>
                    {order.pickupAddress?.countryName ?? '-'}
                  </TableCell>
                  <TableCell>{order.warehouse?.name ?? '-'}</TableCell>
                  <TableCell>
                    {order.orderItems?.[0]?.warehouseItem?.name ?? '-'}
                  </TableCell>
                  <TableCell>
                    {order.orderItems?.[0]?.quantity ?? '-'}
                  </TableCell>

                  <TableCell className={isRTL ? 'text-start' : 'text-end'}>
                    <div className='flex justify-end gap-2'>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size='sm'
                            variant='ghost'
                            onClick={() => {
                              dispatch(clearOrder());
                              handleEdit(order);
                            }}
                          >
                            <Edit size={16} className='text-blue-500' />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>{t('editOrder')}</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size='sm'
                            variant='ghost'
                            onClick={() => handleDeleteClick(order)}
                          >
                            <Trash2 size={16} className='text-red-600' />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>{t('deleteOrder')}</TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <div className='mx-4 mt-4'>
          <TablePagination
            totalItems={data?.totalCount || 0}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>

        <DeleteOrderModal
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
          orderId={selectedOrder?.id ?? null}
        />
      </div>
    </div>
  );
};

export default OrderDataTable;
