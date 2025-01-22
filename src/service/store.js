import { configureStore } from "@reduxjs/toolkit";
import { movieApi } from "./moviesdata";
import { setupListeners } from "@reduxjs/toolkit/query";
import { login } from "./login";

export const store = configureStore({
  reducer: {
    [movieApi.reducerPath]: movieApi.reducer,
    [login.reducerPath]: login.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(movieApi.middleware)
      .concat(login.middleware),
});

setupListeners(store.dispatch);
