import { CountryOrigin } from '@/app/[locale]/dashboard/CountriesOrigin/types/types';
import { SelectedWarehouse } from '@/app/[locale]/dashboard/Order/types/types';
import { PickupAddress } from '@/app/[locale]/dashboard/PickupAddress/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Reciever {
  name: string;
  company_name: string;
  email: string;
  phone_number: string;
}

interface OrderData {
  country_origin: CountryOrigin | null;
  pickup_address: PickupAddress | null;
  reciever: Reciever | null;
  warehouse: SelectedWarehouse | null;
  cod: boolean;
  reference_id: string;
  cod_amount: number;
  instructions: string;

  warehouseItems: {
    warehouseItemId: string;
    quantity: number;
    totalPrice: number;
    totalWeight: number;
  }[];
}

const initialState: OrderData = {
  country_origin: null,
  pickup_address: null,
  reciever: null,
  warehouse: null,
  cod: false,
  reference_id: '',
  cod_amount: 0,
  instructions: '',
  warehouseItems: []
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setCountryOrigin: (state, action: PayloadAction<CountryOrigin>) => {
      console.log(action.payload, 'redux data');
      state.country_origin = action.payload;
    },
    setPickupAddress: (state, action: PayloadAction<PickupAddress>) => {
      state.pickup_address = action.payload;
    },
    setReciever: (state, action: PayloadAction<Reciever>) => {
      state.reciever = action.payload;
    },
    setWarehouse: (state, action: PayloadAction<SelectedWarehouse>) => {
      state.warehouse = action.payload;
    },
    setCod: (state, action: PayloadAction<boolean>) => {
      state.cod = action.payload;
    },
    setReferenceId: (state, action: PayloadAction<string>) => {
      state.reference_id = action.payload;
    },
    setCodAmount: (state, action: PayloadAction<number>) => {
      state.cod_amount = action.payload;
    },
    setInstructions: (state, action: PayloadAction<string>) => {
      state.instructions = action.payload;
    },
    setWarehouseItems: (
      state,
      action: PayloadAction<OrderData['warehouseItems']>
    ) => {
      state.warehouseItems = action.payload;
    },
    resetOrder: (state) => {
      Object.assign(state, initialState);
    },
    clearOrder: (state) => {
      state.country_origin = null;
      state.pickup_address = null;
      state.reciever = null;
      state.warehouse = null;
      state.cod = false;
      state.reference_id = '';
      state.cod_amount = 0;
      state.instructions = '';
    }
  }
});

export const {
  setCountryOrigin,
  setPickupAddress,
  setReciever,
  setWarehouse,
  setCod,
  setReferenceId,
  setCodAmount,
  setInstructions,
  clearOrder,
  setWarehouseItems,
  resetOrder
} = orderSlice.actions;

export default orderSlice.reducer;
