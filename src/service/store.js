import { configureStore } from "@reduxjs/toolkit";
import { movieApi } from "./moviesdata";
import { setupListeners } from "@reduxjs/toolkit/query";
import { login } from "./login";
import { filterApi } from "./filter";
export const store = configureStore({
  reducer: {
    [movieApi.reducerPath]: movieApi.reducer,
    [login.reducerPath]: login.reducer,
    [filterApi.reducerPath]: filterApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(movieApi.middleware)
      .concat(login.middleware)
      .concat(filterApi.middleware),
});

setupListeners(store.dispatch);
