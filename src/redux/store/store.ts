
import { configureStore } from "@reduxjs/toolkit";
import userReducer, { setUser } from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

if (typeof window !== "undefined") {
  const userData = localStorage.getItem("user");
  if (userData) {
    store.dispatch(setUser(JSON.parse(userData)));
  }
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
