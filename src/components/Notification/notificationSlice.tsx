import { createSlice } from '@reduxjs/toolkit';
import { createApplication, updateApplication, getApplication, getApplications } from '../../views/ApplicationsPage/applicationsPageSlice';


interface NotificationState {
  desc: string,
  type: string
}

const initialState: NotificationState = {
  desc: '',
  type: ''
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.desc = action.payload.desc;
      state.type = action.payload.type; 
    },
    clearNotification: (state) => {
      state.desc = initialState.desc;
      state.type = initialState.type;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createApplication.fulfilled, (state) => {
        state.desc = 'New application created';
        state.type = 'success';
      })
      .addCase(createApplication.rejected, (state) => {
        state.desc = 'Application creation failed';
        state.type = 'failed';
      })
      .addCase(updateApplication.fulfilled, (state) => {
        state.desc = 'Application updated';
        state.type = 'success';
      })
      .addCase(updateApplication.rejected, (state) => {
        state.desc = 'Application update failed';
        state.type = 'failed';
      })
      .addCase(getApplication.rejected, (state) => {
        state.desc = 'Get application by id failed';
        state.type = 'failed';
      })
      .addCase(getApplications.rejected, (state) => {
        state.desc = 'Get applications failed';
        state.type = 'failed';
      });
  }
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;