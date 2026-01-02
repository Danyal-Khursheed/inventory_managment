export interface HeroHeaderProps {
  handleButton: (open: boolean) => void;
  componentName: string;
  buttonName: string;
}

export interface PickupFormValues {
  address_nick: string;
  address: string;

  country_name: string;
  country_iso_code: string;
  city_name: string;

  phone_code: string;
  mobile_no: string;

  zip_code: string;
  latitude: string;
  longitude: string;

  warehouseId: string;
}

export interface PickupAddress {
  id: string;
  addressNick: string;
  address_line1: string;
  address_line2?: string;
  zip_code: string;
  phone_code: string;
  mobile_no: string;
  is_default: number;
  latitude: string;
  longitude: string;
  pickup_data?: Record<string, any>;
  hash?: string;
  city_name: string;
  countryName: string;
  country_code: string;
}
