export interface HeaderHeroProps {
  componentName: string;
  buttonName: string;
  handleButton: React.Dispatch<React.SetStateAction<boolean>>;
}

// types/country-origin.ts
export interface CountryOrigin {
  id?: string;
  companyName: string;
  addressNick: string;
  addressLine1: string;
  cityName: string;
  countryName: string;
  countryCode: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  phoneCode: string;
  mobileNo: string;
}

export interface FormValues {
  companyName: string;
  addressNick: string;
  addressLine1: string;
  cityName: string;
  countryName: string;
  countryCode: string;
  zipCode: string;
  latitude: string;
  longitude: string;
  phoneCode: string;
  mobileNo: string;
}
