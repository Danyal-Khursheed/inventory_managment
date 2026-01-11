'use client';

import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux-toolkit/store/store';
import { useCreateOrder } from '../hooks/useOrder';
import { resetOrder } from '@/redux-toolkit/reducers/order';
import { useRouter } from 'next/navigation';

type CreateOrderItem = {
  warehouseItemId: string;
  quantity: number;
  totalPrice: number;
  totalWeight: number;
};

type CreateOrderPayload = {
  warehouseId: string;
  countryOriginId: string;
  pickupAddressId: string;
  items: CreateOrderItem[];
};

const getId = (value: any): string => String(value?.id ?? value ?? '');

const OrderFooter: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const order = useSelector((state: RootState) => state.order);
  const createOrderMutation = useCreateOrder();

  const handleNext = (): void => {
    const items: CreateOrderItem[] =
      order.warehouse?.warehouseItems
        .filter((i) => i.itemId && i.qty > 0)
        .map((i) => ({
          warehouseItemId: String(i.id ?? i.itemId),
          quantity: Number(i.qty),
          totalPrice: Number(i.price),
          totalWeight: Number(i.weight)
        })) || [];

    const payload: CreateOrderPayload = {
      warehouseId: getId(order.warehouse),
      countryOriginId: getId(order.country_origin),
      pickupAddressId: getId(order.pickup_address),
      items
    };

    createOrderMutation.mutate(payload, {
      onSuccess: (data) => {
        dispatch(resetOrder());
        router.push('/dashboard/OrderData');
      }
    });
  };

  return (
    <div className='mt-4 flex items-center justify-end'>
      <Button
        size='lg'
        onClick={handleNext}
        disabled={createOrderMutation.isPending}
      >
        {createOrderMutation.isPending ? 'Creating...' : 'Create'}
      </Button>
    </div>
  );
};

export default OrderFooter;
