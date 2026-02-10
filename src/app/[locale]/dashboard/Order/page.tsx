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
  setWarehouse
} from '@/redux-toolkit/reducers/order';
import Spinner from '@/components/spinningLoading/Spinner';

const Page: React.FC = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const orderId = searchParams.get('id');
  const isEditMode = mode === 'edit' && orderId;
  const { data: orderData, isLoading } = useOrder(isEditMode ? orderId : null);

  // Prefill form when editing
  useEffect(() => {
    if (orderData && isEditMode && orderId) {
      // Handle API response that might be wrapped in 'data' property
      const order = (orderData as any)?.data || orderData;

      // Set country origin
      if (order.countryOriginId) {
        dispatch(
          setCountryOrigin({
            id: order.countryOriginId,
            companyName:
              order.origin?.companyName ||
              order.countryOrigin?.companyName ||
              '',
            addressNick:
              order.origin?.addressNick ||
              order.countryOrigin?.addressNick ||
              '',
            addressLine1:
              order.origin?.addressLine1 ||
              order.countryOrigin?.addressLine1 ||
              '',
            cityName:
              order.origin?.cityName || order.countryOrigin?.cityName || '',
            countryName:
              order.origin?.countryName ||
              order.countryOrigin?.countryName ||
              '',
            countryCode:
              order.origin?.countryCode ||
              order.countryOrigin?.countryCode ||
              '',
            zipCode:
              order.origin?.zipCode || order.countryOrigin?.zipCode || '',
            latitude:
              order.origin?.latitude || order.countryOrigin?.latitude || 0,
            longitude:
              order.origin?.longitude || order.countryOrigin?.longitude || 0,
            phoneCode:
              order.origin?.phoneCode || order.countryOrigin?.phoneCode || '',
            mobileNo:
              order.origin?.mobileNo || order.countryOrigin?.mobileNo || ''
          })
        );
      }

      // Set receiver
      if (order.receiver) {
        dispatch(
          setReciever({
            name: order.receiver.name || '',
            company_name: order.receiver.companyName || '',
            email: order.receiver.email || '',
            phone_number: order.receiver.mobileNo || ''
          })
        );
      }

      // Set pickup address
      if (order.pickupAddressId) {
        dispatch(
          setPickupAddress({
            id: order.pickupAddressId,
            addressNick:
              order.pickup?.addressNick ||
              order.pickupAddress?.addressNick ||
              '',
            address:
              order.pickup?.address || order.pickupAddress?.address || '',
            cityName:
              order.pickup?.cityName || order.pickupAddress?.cityName || '',
            countryName:
              order.pickup?.countryName ||
              order.pickupAddress?.countryName ||
              '',
            countryCode:
              order.pickup?.countryCode ||
              order.pickupAddress?.countryCode ||
              '',
            zipCode:
              order.pickup?.zipCode || order.pickupAddress?.zipCode || '',
            latitude: String(
              order.pickup?.latitude || order.pickupAddress?.latitude || ''
            ),
            longitude: String(
              order.pickup?.longitude || order.pickupAddress?.longitude || ''
            ),
            mobileNo: String(
              order.pickup?.mobileNo || order.pickupAddress?.mobileNo || ''
            )
          })
        );
      }

      // Set warehouse and items
      if (order.warehouseId) {
        dispatch(
          setWarehouse({
            id: order.warehouseId,
            name: order.warehouse?.name || '',
            box: {
              length: order.box?.length || 0,
              width: order.box?.width || 0,
              height: order.box?.height || 0,
              volumetricWeight: order.box?.volumetricWeight || 0
            },
            warehouseItems: (order.items || []).map(
              (item: any, index: number) => ({
                id: item.warehouseItemId || item.id,
                rowId: index + 1,
                itemId: item.warehouseItemId || item.id,
                name: item.name || item.warehouseItem?.name || '',
                qty: item.quantity || 0,
                weight: item.totalWeight || item.weight || 0,
                price: item.totalPrice || item.price || 0,
                originalQty: item.quantity || 0,
                originalWeight: item.totalWeight || item.weight || 0,
                originalPrice: item.totalPrice || item.price || 0
              })
            )
          })
        );
      }
    }
  }, [orderData, isEditMode, orderId, dispatch]);

  if (isLoading && isEditMode) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  return (
    <div className='mx-auto max-h-screen max-w-4xl px-4'>
      <HeaderHero componentName={isEditMode ? 'Edit Order' : 'Create Order'} />
      <div className='grid grid-cols-1 gap-6'>
        <OriginCard />

        <ReceiverCard />

        <PickupCard />
        <AdditionalInfoCard />
        <PackageSection />
        <OrderFooter orderId={isEditMode ? orderId : null} />
      </div>
    </div>
  );
};

export default Page;
