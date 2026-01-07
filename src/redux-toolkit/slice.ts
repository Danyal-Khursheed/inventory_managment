import { OriginType } from '@/app/[locale]/dashboard/Order/components/EditOriginModal';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  origin: OriginType | null;
  value: number;
}

const initialState: CartState = {
  origin: null,
  value: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setOrigin: (state, action: PayloadAction<OriginType>) => {
      state.origin = action.payload;
    },
    clearCart: (state) => {
      state.origin = null;
      state.value = 0;
    }
  }
});

export const { setOrigin, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
