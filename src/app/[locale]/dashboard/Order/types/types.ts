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
