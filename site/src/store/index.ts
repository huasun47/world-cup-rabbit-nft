import { configureStore } from "@reduxjs/toolkit";
import app from "./modules/app";

const store = configureStore({
  reducer: {
    app,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
