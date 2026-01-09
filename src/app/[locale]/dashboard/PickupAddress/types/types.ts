import { X } from 'lucide-react';

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
  address: string;
  cityName: string;
  countryName: string;
  countryCode: string;
  zipCode?: string;
  latitude: string;
  longitude: string;
  mobileNo: string;
}

export interface PickupApi {
  id: string;
  address_nick: string;
  zip_code: string;
  mobile_no: string;
  latitude: string;
  longitude: string;
  city_name: string;
  country_name: string;
  country_code: string;
  zipCode?: string;
}
