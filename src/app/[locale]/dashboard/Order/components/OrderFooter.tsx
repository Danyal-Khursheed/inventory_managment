'use client';

import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux-toolkit/store/store';
import { useCreateOrder, useUpdateOrder } from '../hooks/useOrder';
import { resetOrder } from '@/redux-toolkit/reducers/order';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import type { CreateOrderPayload } from '../types/types';
import type { OrderDetail, UpdateOrderPayload } from '@/services/orderService';

const getId = (value: any): string => String(value?.id ?? value ?? '');

interface OrderFooterProps {
  orderId?: string | null;
  /** When editing, the fetched order so we can send orderStatus, paymentStatus, deliveryDate, shippingCompanyId */
  initialOrder?: OrderDetail | null;
}

const OrderFooter: React.FC<OrderFooterProps> = ({ orderId, initialOrder }) => {
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

    const items =
      order.warehouse?.warehouseItems
        .filter((i) => i.itemId && i.qty > 0)
        .map((i) => ({
          warehouseItemId: String(i.id ?? i.itemId),
          quantity: Number(i.qty),
          totalPrice: Number(i.price),
          totalWeight: Number(i.weight)
        })) || [];

    const box = order.warehouse?.box ?? {
      length: 0,
      width: 0,
      height: 0,
      volumetricWeight: 0
    };

    const basePayload: CreateOrderPayload = {
      warehouseId: getId(order.warehouse),
      countryOriginId: getId(order.country_origin),
      pickupAddressId: getId(order.pickup_address),
      receiver: {
        name: order.reciever!.name,
        companyName: order.reciever!.company_name,
        email: order.reciever!.email,
        mobileNo: order.reciever!.phone_number
      },
      cod: order.cod,
      referenceId: order.reference_id ?? '',
      codAmount: Number(order.cod_amount) || 0,
      instructions: order.instructions ?? '',
      box: {
        length: Number(box.length) || 0,
        width: Number(box.width) || 0,
        height: Number(box.height) || 0,
        volumetricWeight: Number(box.volumetricWeight) || 0
      },
      items
    };

    if (isEditMode && orderId) {
      const { items: _items, ...baseWithoutItems } = basePayload;
      const updatePayload: UpdateOrderPayload = {
        ...baseWithoutItems,
        orderStatus: initialOrder?.orderStatus ?? 'pending',
        paymentStatus: initialOrder?.paymentStatus ?? 'pending',
        deliveryDate: initialOrder?.deliveryDate ?? null,
        shippingCompanyId: initialOrder?.shippingCompanyId ?? null
      };
      updateOrderMutation.mutate(
        { id: orderId, payload: updatePayload },
        {
          onSuccess: (data) => {
            dispatch(resetOrder());
            router.push(`/${locale}/dashboard/OrderData`);
          }
        }
      );
    } else {
      createOrderMutation.mutate(basePayload, {
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
    <div className='mb-20 flex items-center justify-end'>
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
