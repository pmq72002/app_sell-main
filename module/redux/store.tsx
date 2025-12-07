import {configureStore} from '@reduxjs/toolkit';
import auth from '../screen/Login/LoginState';
import cart from '../screen/Cart/CartState';
export const store = configureStore({
  reducer: {
    auth,
    cart,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
