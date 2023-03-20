import auth from "./slice/auth";
import services from "./slice/service";
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
  reducer: {
    auth: auth,
    services: services,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
