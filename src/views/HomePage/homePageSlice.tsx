import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services';

export type Product = {
    id: number;
    name: string;
    family: "VALUE_FLEX";
    type: "VARIABLE" | "FIXED";
    term:
      | "1_YEAR"
      | "2_YEAR"
      | "3_YEAR"
      | "4_YEAR"
      | "5_YEAR"
      | "6_YEAR"
      | "7_YEAR"
      | "10_YEAR";
    insurable: boolean;
    insurance: "INSURED" | "CONVENTIONAL";
    prepaymentOption: "STANDARD" | "HELOC";
    restrictionsOption:
      | "NO_RESTRICTIONS"
      | "SOME_RESTRICTIONS"
      | "MORE_RESTRICTIONS";
    restrictions: string;
    fixedPenaltySpread: string;
    helocOption: "HELOC_WITH" | "HELOC_WITHOUT";
    helocDelta: number;
    lenderName: string;
    lenderType: string;
    rateHold: "30_DAYS" | "45_DAYS" | "60_DAYS" | "90_DAYS" | "120_DAYS";
    rate: number;
    ratePrimeVariance: number;
    bestRate: number;
    created: string;
    updated: string;
  };

interface ProductsState {
  products: Product[] | null,
  status: string,
}

const initialState: ProductsState = {
  products: null,
  status: 'idle',
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await api.get('/products');
    return response.data;
});

export const homePageSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = 'idle';
      });
  }
});

export default homePageSlice.reducer;