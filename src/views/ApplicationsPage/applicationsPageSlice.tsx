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

export type Applicant = {
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type ApplicationType = {
  id: string;
  token: string;
  type: "NEW" | "RENEWAL" | "REFINANCE";
  applicants: Applicant[];
  productId?: number;
  createdAt: string;
};

export type CreateApplication = {
  productId: number;
};

export type CreateApplicationData = {
  id: string;
  app: Partial<ApplicationType>
};

interface ApplicationsState {
  selectedProduct: Product | null,
  application: ApplicationType | null,
  allApplications: ApplicationType[],
  status: string,
}

const initialState: ApplicationsState = {
  selectedProduct: null,
  application: null,
  allApplications: [],
  status: 'idle',
};

export const createApplication = createAsyncThunk('applications/create', async (productId: number) => {
    const response = await api.post('/applications', productId);
    return {
      data: response.data,
      productId: productId
    };
});

export const updateApplication = createAsyncThunk('applications/update', async (data: CreateApplicationData) => {
  const response = await api.put(`/applications/${data.id}`, data.app);
  return response.data;
});

export const getApplication = createAsyncThunk('applications/get', async (id, thunkAPI) => {
  const response = await api.get(`/applications/${id}`);
  return response.data;
});

export const getApplications = createAsyncThunk('applications/getAll', async () => {
  const response = await api.get('/applications');
  return response.data;
});

export const applicationsPageSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    setApplication: (state, action) => {
        state.application = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createApplication.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(createApplication.fulfilled, (state, action) => {
        state.application = {...action.payload.data, productId: action.payload.productId};
        state.status = 'idle';
      })
      .addCase(updateApplication.fulfilled, (state, action) => {
        state.application = null;
        const itemExists = state.allApplications.find(i => action.payload.id === i.id);
        if (itemExists) {
          // update existing item
          state.allApplications = state.allApplications.map(i => {
            if (action.payload.id === i.id) {
              i = action.payload;
            }
            return i;
          });
        } else {
          // add new item to the list
          state.allApplications.unshift(action.payload);
        }
      })
      .addCase(getApplication.fulfilled, (state, action) => {
        state.application = action.payload;
      })
      .addCase(getApplications.fulfilled, (state, action) => {
        state.allApplications = action.payload;
      });
  }
});

export const { setApplication } = applicationsPageSlice.actions;

export default applicationsPageSlice.reducer;