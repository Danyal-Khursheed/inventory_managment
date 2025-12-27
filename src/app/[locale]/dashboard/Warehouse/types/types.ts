import { Warehouse } from '@/services/warehouse.service';
import { User } from '@sentry/nextjs';

// create modal interface
export interface FormValues {
  name: string;
  address: string;
  city: string;
  country: string;
}

export interface CreateNewWarehousePopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// updat modal interface
export interface FormValues {
  name: string;
  address: string;
  city: string;
  country: string;
}

export interface UpdateWarehouseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  warehouse: Warehouse | null;
}

// Heroheader section interface
export interface HeroHeaderProps {
  componentName: string;
  buttonName: string;
  handleButton: (state: boolean) => void;
}

// API response for fetching warehouses
export interface WarehousePage {
  data: Warehouse[];
  totalCount: number;
}

// types/warehouse.ts
export interface WarehousesResponse {
  data: Warehouse[];
  totalCount: number;
}

export interface HeroHeaderProps {
  handleButton: (open: boolean) => void;
  componentName: string;
  buttonName: string;
}
