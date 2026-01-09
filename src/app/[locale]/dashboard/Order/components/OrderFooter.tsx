'use client';

import { Button } from '@/components/ui/button';
import { RootState } from '@/redux-toolkit/store/store';
import { useSelector } from 'react-redux';
import { useCreateOrder } from '../hooks/useOrder';

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

const getId = (value: any): string => {
  return String(value?.id ?? value ?? '');
};

const OrderFooter: React.FC = () => {
  const order = useSelector((state: RootState) => state.order);
  const createOrderMutation = useCreateOrder();

  const warehouseItems = order.warehouse?.warehouseItems ?? [];

  const handleNext = (): void => {
    const items: CreateOrderItem[] = warehouseItems.map((item) => ({
      warehouseItemId: String(item?.id ?? item?.itemId),
      quantity: Number(item.qty ?? 0),
      totalPrice: Number(item.price ?? 0),
      totalWeight: Number(item.weight ?? 0)
    }));

    console.log('warehouseId:', getId(order.warehouse));
    console.log('countryOriginId:', getId(order.country_origin));
    console.log('pickupAddressId:', getId(order.pickup_address));
    console.log('items:', items);

    const payload: CreateOrderPayload = {
      warehouseId: getId(order.warehouse),
      countryOriginId: getId(order.country_origin),
      pickupAddressId: getId(order.pickup_address),
      items
    };

    console.log('✅ FINAL PAYLOAD SENT TO API:', payload);

    createOrderMutation.mutate(payload);
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
