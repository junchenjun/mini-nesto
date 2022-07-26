import { configureStore } from '@reduxjs/toolkit';
import notificationSlice from '../components/Notification/notificationSlice';
import applicationsPageSlice from '../views/ApplicationsPage/applicationsPageSlice';
import homePageSlice from '../views/HomePage/homePageSlice';
import { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

const store = configureStore({
  reducer: {
    products: homePageSlice,
    applications: applicationsPageSlice,
    notification: notificationSlice
  },
  // middleware: (getDefaultMiddleware) =>
  // getDefaultMiddleware()
  //   .prepend(
  //     // correctly typed middlewares can just be used
  //     additionalMiddleware,
  //     // you can also type middlewares manually
  //     untypedMiddleware as Middleware<
  //       (action: Action<'specialAction'>) => number,
  //       RootState
  //     >
  //   )
  //   // prepend and concat calls can be chained
  //   .concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;