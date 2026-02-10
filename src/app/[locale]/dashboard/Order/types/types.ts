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
  id: string;
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

export interface OrderItem {
  warehouseItemId: string;
  quantity: number;
  totalPrice: number;
  totalWeight: number;
}

export interface CreateOrderReceiver {
  name: string;
  companyName: string;
  email: string;
  mobileNo: string;
}

export interface CreateOrderBox {
  length: number;
  width: number;
  height: number;
  volumetricWeight: number;
}

export interface OrderState {
  warehouseId: string;
  countryOriginId: string;
  pickupAddressId: string;
  items: OrderItem[];
}

export interface CreateOrderPayload {
  warehouseId: string;
  countryOriginId: string;
  pickupAddressId: string;
  receiver: CreateOrderReceiver;
  cod: boolean;
  referenceId: string;
  codAmount: number;
  instructions: string;
  box: CreateOrderBox;
  items: OrderItem[];
}

interface OrderData {
  country_origin: string | { id: string };
  pickup_address: string | { id: string };
  warehouse: string | { id: string };
  items?: Array<{
    warehouse_item_id: string;
    quantity: number;
    total_price: number;
    total_weight: number;
  }>;
}
