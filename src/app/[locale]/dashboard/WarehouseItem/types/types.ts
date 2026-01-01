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
  pricePerItem: number;
  quantity: number;
  weightPerItem: number;
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
