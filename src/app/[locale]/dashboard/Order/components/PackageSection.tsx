'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Plus, Trash } from 'lucide-react';
import { useGetAllWarehouses } from '../hooks';
import { Spinner } from '@/components/ui/Spinner';
import { useGetAllWarehouseItems } from '../hooks/useGetAllWarehouseItems';
import { toast } from 'sonner';
import {
  PackageWarehouseItem,
  SelectedWarehouse,
  WarehouseItem
} from '../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux-toolkit/store/store';
import { setWarehouse } from '@/redux-toolkit/reducers/order';
import ClientOnly from '@/components/ClientOnly';
import { Label } from '@/components/ui/label';
import { useTranslations, useLocale } from 'next-intl';

const PackageSection: React.FC = () => {
  const dispatch = useDispatch();
  const t = useTranslations('PackageSection');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const savedWarehouse = useSelector(
    (state: RootState) => state.order.warehouse
  );

  const [selectedWarehouse, setSelectedWarehouse] =
    useState<SelectedWarehouse | null>(() => {
      if (!savedWarehouse) return null;
      return {
        ...savedWarehouse,
        warehouseItems: Array.isArray(savedWarehouse.warehouseItems)
          ? savedWarehouse.warehouseItems.map((item, index) => ({
              ...item,
              id: item.id ?? item.itemId ?? String(index)
            }))
          : []
      };
    });

  const { data: warehousesData, isLoading: warehousesLoading } =
    useGetAllWarehouses({ pageNumber: 1, pageSize: 10 });
  const { data: warehouseItemsData } = useGetAllWarehouseItems({
    pageNumber: 1,
    pageSize: 50
  });

  useEffect(() => {
    if (!selectedWarehouse) return;

    dispatch(
      setWarehouse({
        ...selectedWarehouse,
        warehouseItems: Array.isArray(selectedWarehouse.warehouseItems)
          ? selectedWarehouse.warehouseItems
          : []
      })
    );
  }, [selectedWarehouse, dispatch]);

  // Sync from Redux when prefill runs (e.g. edit order)
  useEffect(() => {
    if (
      savedWarehouse?.id &&
      savedWarehouse?.warehouseItems?.length !== undefined
    ) {
      setSelectedWarehouse({
        ...savedWarehouse,
        warehouseItems: Array.isArray(savedWarehouse.warehouseItems)
          ? savedWarehouse.warehouseItems.map((item, index) => ({
              ...item,
              id: item.id ?? item.itemId ?? String(index)
            }))
          : []
      });
    }
  }, [savedWarehouse?.id]);

  const filteredItems = warehouseItemsData?.data?.filter(
    (item: WarehouseItem) => String(item.warehouseId) === selectedWarehouse?.id
  );

  const updateBox = (field: 'length' | 'width' | 'height', value: string) => {
    if (!selectedWarehouse) return;
    const numericValue = Number(value);

    setSelectedWarehouse((prev) => {
      if (!prev) return prev;
      const updatedBox = { ...prev.box, [field]: numericValue };
      const { length, width, height } = updatedBox;

      return {
        ...prev,
        box: {
          ...updatedBox,
          volumetricWeight:
            length && width && height
              ? Number(((length * width * height) / 5000).toFixed(2))
              : 0
        }
      };
    });
  };

  const addItem = () => {
    if (!selectedWarehouse) return;

    setSelectedWarehouse((prev) => {
      if (!prev) return prev;
      const nextId = prev.warehouseItems?.length + 1;

      return {
        ...prev,
        warehouseItems: [
          ...prev.warehouseItems,
          {
            id: String(nextId),
            rowId: nextId,
            itemId: '',
            name: '',
            qty: 0,
            weight: 0,
            price: 0,
            originalQty: 0,
            originalWeight: 0,
            originalPrice: 0
          }
        ]
      };
    });
  };

  const deleteItem = (rowId: number) => {
    if (!selectedWarehouse) return;
    setSelectedWarehouse((prev) =>
      prev
        ? {
            ...prev,
            warehouseItems: prev.warehouseItems.filter(
              (item) => item.rowId !== rowId
            )
          }
        : prev
    );
  };

  const updateItem = (
    rowId: number,
    field: keyof PackageWarehouseItem,
    value: string
  ) => {
    if (!selectedWarehouse) return;

    setSelectedWarehouse((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        warehouseItems: prev.warehouseItems.map((row) => {
          if (row.rowId !== rowId) return row;

          if (field === 'itemId') {
            const whItem = filteredItems?.find(
              (i: WarehouseItem) => String(i.id) === value
            );
            if (!whItem) return row;

            return {
              rowId: row.rowId,
              itemId: String(whItem.id),
              id: String(whItem.id),
              name: whItem.name,
              qty: whItem.quantity,
              weight: whItem.weightPerItem,
              price: whItem.pricePerItem,
              originalQty: whItem.quantity,
              originalWeight: whItem.weightPerItem,
              originalPrice: whItem.pricePerItem
            };
          }

          const numericValue = Number(value);

          if (field === 'qty' && numericValue > row.originalQty) {
            toast(t('qtyExceed', { max: row.originalQty }));
            return row;
          }

          if (field === 'weight' && numericValue > row.originalWeight) {
            toast(t('weightExceed', { max: row.originalWeight }));
            return row;
          }

          if (field === 'price' && numericValue > row.originalPrice) {
            toast(t('priceExceed', { max: row.originalPrice }));
            return row;
          }

          return { ...row, [field]: numericValue };
        })
      };
    });
  };

  return (
    <Card
      id='warehouse-card'
      className='mt-6 w-full'
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <CardHeader className='space-y-2'>
        <CardTitle>{t('title')}</CardTitle>
        <ClientOnly>
          <div className='space-y-2'>
            <Label className='text-sm font-medium'>
              {t('selectWarehouse')}
            </Label>
            <Select
              value={selectedWarehouse?.id || ''}
              onValueChange={(warehouseId) => {
                const warehouse = warehousesData?.data?.find(
                  (w: any) => String(w.id) === warehouseId
                );
                if (!warehouse) return;

                setSelectedWarehouse({
                  id: String(warehouse.id),
                  name:
                    warehouse.name ||
                    warehouse.warehouseName ||
                    warehouse.company_name,
                  box: { length: 0, width: 0, height: 0, volumetricWeight: 0 },
                  warehouseItems: []
                });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('selectWarehouse')} />
              </SelectTrigger>

              <SelectContent>
                {warehousesLoading ? (
                  <SelectItem value='loading'>
                    <Spinner />
                  </SelectItem>
                ) : (
                  warehousesData?.data?.map((warehouse: any) => (
                    <SelectItem key={warehouse.id} value={String(warehouse.id)}>
                      {warehouse.name ||
                        warehouse.warehouseName ||
                        warehouse.company_name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
        </ClientOnly>
      </CardHeader>

      {selectedWarehouse && (
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label className='text-sm font-medium'>{t('boxDimensions')}</Label>
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-5'>
              <div className='space-y-1'>
                <Label className='text-muted-foreground text-xs'>
                  {t('length')}
                </Label>
                <Input
                  type='number'
                  placeholder={t('length')}
                  value={selectedWarehouse?.box?.length ?? ''}
                  onChange={(e) => updateBox('length', e.target.value)}
                />
              </div>
              <div className='space-y-1'>
                <Label className='text-muted-foreground text-xs'>
                  {t('width')}
                </Label>
                <Input
                  type='number'
                  placeholder={t('width')}
                  value={selectedWarehouse?.box?.width ?? ''}
                  onChange={(e) => updateBox('width', e.target.value)}
                />
              </div>
              <div className='space-y-1'>
                <Label className='text-muted-foreground text-xs'>
                  {t('height')}
                </Label>
                <Input
                  type='number'
                  placeholder={t('height')}
                  value={selectedWarehouse?.box?.height ?? ''}
                  onChange={(e) => updateBox('height', e.target.value)}
                />
              </div>
              <div className='space-y-1'>
                <Label className='text-muted-foreground text-xs'>
                  {t('volumetricWeight')}
                </Label>
                <Input
                  disabled
                  value={selectedWarehouse?.box?.volumetricWeight ?? ''}
                  placeholder={t('volumetricWeight')}
                />
              </div>
              <div className='flex items-end'>
                <Button onClick={addItem}>
                  <Plus className='mr-2 h-4 w-4' /> {t('add')}
                </Button>
              </div>
            </div>
          </div>

          <div id='package-card' className='overflow-x-auto'>
            <table className='w-full border text-sm'>
              <thead>
                <tr className='bg-muted/50 border-b'>
                  <th className='p-3 text-left text-xs font-medium'>
                    {t('row')}
                  </th>
                  <th className='p-3 text-left text-xs font-medium'>
                    {t('selectItem')}
                  </th>
                  <th className='p-3 text-left text-xs font-medium'>
                    {t('qty')}
                  </th>
                  <th className='p-3 text-left text-xs font-medium'>
                    {t('weight')}
                  </th>
                  <th className='p-3 text-left text-xs font-medium'>
                    {t('price')}
                  </th>
                  <th className='w-12 p-3' />
                </tr>
              </thead>
              <tbody>
                {selectedWarehouse.warehouseItems.map((row, index) => (
                  <tr key={row.rowId}>
                    <td className='p-3'>{index + 1}</td>
                    <td className='p-3'>
                      <ClientOnly>
                        <Select
                          value={row.itemId ? String(row.itemId) : undefined}
                          onValueChange={(value) =>
                            updateItem(row.rowId, 'itemId', value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={t('selectItem')} />
                          </SelectTrigger>
                          <SelectContent>
                            {filteredItems && filteredItems.length > 0 ? (
                              filteredItems.map((item: WarehouseItem) => (
                                <SelectItem
                                  key={item.id}
                                  value={String(item.id)}
                                >
                                  {item.name}
                                </SelectItem>
                              ))
                            ) : (
                              <div className='text-gray-500 select-none'>
                                {t('noItemFound')}
                              </div>
                            )}
                          </SelectContent>
                        </Select>
                      </ClientOnly>
                    </td>
                    <td className='p-3'>
                      <Input
                        type='number'
                        value={row.qty}
                        onChange={(e) =>
                          updateItem(row.rowId, 'qty', e.target.value)
                        }
                      />
                    </td>
                    <td className='p-3'>
                      <Input
                        type='number'
                        value={row.weight}
                        onChange={(e) =>
                          updateItem(row.rowId, 'weight', e.target.value)
                        }
                      />
                    </td>
                    <td className='p-3'>
                      <Input
                        type='number'
                        value={row.price}
                        onChange={(e) =>
                          updateItem(row.rowId, 'price', e.target.value)
                        }
                      />
                    </td>
                    <td className='p-3'>
                      <Button
                        size='icon'
                        variant='destructive'
                        onClick={() => deleteItem(row.rowId)}
                      >
                        <Trash className='h-4 w-4' />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default PackageSection;
