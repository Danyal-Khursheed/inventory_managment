import { WarehouseItemsResponse } from '@/services/warehouseItem';
import { QueryObserverResult } from '@tanstack/react-query';

export interface Warehouse {
  id: string;
  name: string;
}
export interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  warehouseItem: WarehouseItem | null;
}

export interface WarehouseItem {
  id?: string;
  name: string;
  warehouseId: string;
  pricePerItem: number;
  quantity: number;
  weightPerItem: number;
  upc: string;
  sku: string;
}

export interface FormValues {
  name: string;
  warehouseId: string;
  pricePerItem: number;
  quantity: number;
  weightPerItem: number;
  upc: string;
  sku: string;
}

export interface HeroHeaderProps {
  componentName: string;
  buttonName: string;
  handleButton: (open: boolean) => void;
  onCSVSuccess?: () => void | Promise<
    QueryObserverResult<WarehouseItemsResponse, Error>
  >;
}
