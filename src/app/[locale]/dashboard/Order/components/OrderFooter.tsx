'use client';

import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux-toolkit/store/store';
import { useCreateOrder, useUpdateOrder } from '../hooks/useOrder';
import { resetOrder } from '@/redux-toolkit/reducers/order';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

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

interface OrderFooterProps {
  orderId?: string | null;
}

const OrderFooter: React.FC<OrderFooterProps> = ({ orderId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations('Order');
  const order = useSelector((state: RootState) => state.order);
  const createOrderMutation = useCreateOrder();
  const updateOrderMutation = useUpdateOrder();
  const isEditMode = !!orderId;

  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Add a temporary highlight class
      element.classList.add('border-red-500', 'border-2');
      setTimeout(() => {
        element.classList.remove('border-red-500', 'border-2');
      }, 3000);
    }
  };

  const validateOrder = (): { isValid: boolean; missingFields: string[] } => {
    const missingFields: string[] = [];

    if (!order.country_origin || !getId(order.country_origin)) {
      missingFields.push('origin');
    }

    if (!order.reciever || !order.reciever.name) {
      missingFields.push('receiver');
    }

    if (!order.pickup_address || !getId(order.pickup_address)) {
      missingFields.push('pickup');
    }

    if (!order.warehouse || !getId(order.warehouse)) {
      missingFields.push('warehouse');
    }

    const items =
      order.warehouse?.warehouseItems?.filter((i) => i.itemId && i.qty > 0) ||
      [];
    if (items.length === 0) {
      missingFields.push('package');
    }

    return {
      isValid: missingFields.length === 0,
      missingFields
    };
  };

  const handleNext = (): void => {
    const validation = validateOrder();

    if (!validation.isValid) {
      toast.error(t('fillRequiredFields'));

      // Scroll to first missing field
      if (validation.missingFields.length > 0) {
        const fieldMap: Record<string, string> = {
          origin: 'origin-card',
          receiver: 'receiver-card',
          pickup: 'pickup-card',
          warehouse: 'warehouse-card',
          package: 'package-card'
        };

        const firstMissing = validation.missingFields[0];
        scrollToElement(fieldMap[firstMissing] || 'origin-card');
      }

      return;
    }

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

    if (isEditMode && orderId) {
      updateOrderMutation.mutate(
        { id: orderId, payload },
        {
          onSuccess: (data) => {
            dispatch(resetOrder());
            router.push(`/${locale}/dashboard/OrderData`);
          }
        }
      );
    } else {
      createOrderMutation.mutate(payload, {
        onSuccess: (data) => {
          dispatch(resetOrder());
          router.push(`/${locale}/dashboard/OrderData`);
        }
      });
    }
  };

  const isPending = isEditMode
    ? updateOrderMutation.isPending
    : createOrderMutation.isPending;

  return (
    <div className='mt-4 flex items-center justify-end'>
      <Button size='lg' onClick={handleNext} disabled={isPending}>
        {isPending
          ? isEditMode
            ? t('updating')
            : t('creating')
          : isEditMode
            ? t('update')
            : t('create')}
      </Button>
    </div>
  );
};

export default OrderFooter;
