'use client';

import { useEffect } from 'react';
import AdditionalInfoCard from './components/AdditionalInfoCard';
import HeaderHero from './components/HeaderHero';
import OrderFooter from './components/OrderFooter';
import OriginCard from './components/OriginCard';
import PackageSection from './components/PackageSection';
import PickupCard from './components/PickupCard';
import ReceiverCard from './components/ReceiverCard';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { useOrder } from './hooks/useOrder';
import {
  setCountryOrigin,
  setPickupAddress,
  setReciever,
  setWarehouse,
  setCod,
  setReferenceId,
  setCodAmount,
  setInstructions,
  resetOrder
} from '@/redux-toolkit/reducers/order';
import Spinner from '@/components/spinningLoading/Spinner';

const Page: React.FC = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const orderId = searchParams.get('id');
  const isEditMode = mode === 'edit' && orderId;
  const { data: orderData, isLoading } = useOrder(isEditMode ? orderId : null);

  // Clear order state when opening create (not edit) so form starts empty
  useEffect(() => {
    if (!isEditMode) {
      dispatch(resetOrder());
    }
  }, [isEditMode, dispatch]);

  // Prefill form when editing — GET /api/orders/:id response mapped to Redux
  useEffect(() => {
    if (!orderData || !isEditMode || !orderId) return;

    const order = orderData;
    const origin = order.countryOrigin;
    const pickup = order.pickupAddress;
    const warehouse = order.warehouse;
    const orderItems = order.orderItems ?? [];

    // Country origin (countryOriginId + countryOrigin)
    if (order.countryOriginId && origin) {
      dispatch(
        setCountryOrigin({
          id: origin.id ?? order.countryOriginId,
          companyName: origin.companyName ?? '',
          addressNick: origin.addressNick ?? '',
          addressLine1: origin.addressLine1 ?? '',
          cityName: origin.cityName ?? '',
          countryName: origin.countryName ?? '',
          countryCode: origin.countryCode ?? '',
          zipCode: origin.zipCode ?? '',
          latitude: Number(origin.latitude) || 0,
          longitude: Number(origin.longitude) || 0,
          phoneCode: origin.phoneCode ?? '',
          mobileNo: origin.mobileNo ?? ''
        })
      );
    }

    // Receiver (flat: receiverName, receiverCompanyName, receiverEmail, receiverMobileNo)
    if (
      order.receiverName != null ||
      order.receiverEmail != null ||
      order.receiverCompanyName != null ||
      order.receiverMobileNo != null
    ) {
      dispatch(
        setReciever({
          name: order.receiverName ?? '',
          company_name: order.receiverCompanyName ?? '',
          email: order.receiverEmail ?? '',
          phone_number: order.receiverMobileNo ?? ''
        })
      );
    }

    // Pickup address (pickupAddressId + pickupAddress)
    if (order.pickupAddressId && pickup) {
      dispatch(
        setPickupAddress({
          id: pickup.id ?? order.pickupAddressId,
          addressNick: pickup.addressNick ?? '',
          address: pickup.address ?? '',
          cityName: pickup.cityName ?? '',
          countryName: pickup.countryName ?? '',
          countryCode: pickup.countryCode ?? '',
          zipCode: pickup.zipCode ?? '',
          latitude: String(pickup.latitude ?? ''),
          longitude: String(pickup.longitude ?? ''),
          mobileNo: String(pickup.mobileNo ?? '')
        })
      );
    }

    // Warehouse + box (flat boxLength/boxWidth/boxHeight/volumetricWeight) + orderItems
    if (order.warehouseId) {
      dispatch(
        setWarehouse({
          id: order.warehouseId,
          name: warehouse?.name ?? '',
          box: {
            length: Number(order.boxLength) || 0,
            width: Number(order.boxWidth) || 0,
            height: Number(order.boxHeight) || 0,
            volumetricWeight: Number(order.volumetricWeight) || 0
          },
          warehouseItems: orderItems.map((item, index: number) => ({
            id: item.warehouseItemId ?? item.id,
            rowId: index + 1,
            itemId: item.warehouseItemId ?? item.id,
            name: item.warehouseItem?.name ?? '',
            qty: Number(item.quantity) || 0,
            weight: Number(item.totalWeight) || 0,
            price: Number(item.totalPrice) || Number(item.unitPrice) || 0,
            originalQty: Number(item.quantity) || 0,
            originalWeight: Number(item.totalWeight) || 0,
            originalPrice:
              Number(item.totalPrice) || Number(item.unitPrice) || 0
          }))
        })
      );
    }

    // Additional info
    dispatch(setCod(!!order.cod));
    dispatch(setReferenceId(order.referenceId ?? ''));
    dispatch(setCodAmount(Number(order.codAmount) || 0));
    dispatch(setInstructions(order.instructions ?? ''));
  }, [orderData, isEditMode, orderId, dispatch]);

  if (isLoading && isEditMode) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-4xl px-4 pb-24'>
      <HeaderHero componentName={isEditMode ? 'Edit Order' : 'Create Order'} />
      <div className='grid grid-cols-1 gap-6'>
        <OriginCard />

        <ReceiverCard />

        <PickupCard />
        <AdditionalInfoCard />
        <PackageSection />
        <OrderFooter
          orderId={isEditMode ? orderId : null}
          initialOrder={isEditMode ? (orderData ?? null) : null}
        />
      </div>
    </div>
  );
};

export default Page;
