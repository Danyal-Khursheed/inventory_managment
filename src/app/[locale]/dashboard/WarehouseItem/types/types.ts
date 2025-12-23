// types/warehouseItem.ts

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
  handleButton: (state: boolean) => void;
}
