// types/warehouseItem.ts

import { WarehouseItemsResponse } from '@/services/warehouseItem';
import { QueryObserverResult } from '@tanstack/react-query';

export interface Warehouse {
  id: string;
  name: string;
}

export interface WarehouseItem {
  id?: string;
  name: string;
  warehouseId: string;
  price: number;
  quantity: number;
  weight: number;
  warehouse?: Warehouse;
}

export interface FormValues {
  name: string;
  warehouseId: string;
  price: number;
  quantity: number;
  weight: number;
}

export interface HeroHeaderProps {
  componentName: string;
  buttonName: string;
  handleButton: (open: boolean) => void;
  onCSVSuccess?: () => void | Promise<
    QueryObserverResult<WarehouseItemsResponse, Error>
  >;
}
