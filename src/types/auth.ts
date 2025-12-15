export type User = {
  id: string;
  email: string;
  name?: string;
};

export type SignupPayload = {
  fullName: string;
  email: string;
  password: string;
  countryCode: string;
  phoneNumber: string;
  companyName: string;
  companyEmail: string;
  companyCountryCode: string;
  companyPhoneNumber: string;
  address: string;
};

export type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  // ✅ FIXED: now accepts ONE object
  signup: (data: SignupPayload) => Promise<void>;

  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
};
