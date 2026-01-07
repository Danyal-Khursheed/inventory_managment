export interface HeroHeaderProps {
  //   handleButton: (open: boolean) => void;
  componentName: string;
  //   buttonName: string;
}

export interface PickupType {
  id: string;
  addressNick?: string;
  address?: string;
  cityName?: string;
  countryName?: string;
  countryCode?: string;
  latitude?: number | string;
  longitude?: number | string;
  mobileNo?: number | string;
}

export interface ReceiverType {
  name: string;
  companyName: string;
  email: string;
  mobileNo: string;
}

export interface WarehouseItem {
  id?: string;
  name: string;
  warehouseId: string;
  pricePerItem: number;
  quantity: number;
  weightPerItem: number;
}

export interface PackageWarehouseItem {
  rowId: number;
  itemId: string;
  name: string;
  qty: number;
  weight: number;
  price: number;
  originalQty: number;
  originalWeight: number;
  originalPrice: number;
}

export interface BoxDimensions {
  length: number;
  width: number;
  height: number;
  volumetricWeight: number;
}

export interface SelectedWarehouse {
  id: string;
  name: string;
  box: BoxDimensions;
  warehouseItems: PackageWarehouseItem[];
}
