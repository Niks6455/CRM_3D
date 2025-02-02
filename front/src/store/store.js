import { combineReducers, configureStore } from "@reduxjs/toolkit";
import basketSlice from "./Basket/basket";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  basketSlice: basketSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["basketSlice" ],
  // blacklist: ["isSelectBlockSlice", "isTestSlice"],
  // blacklist: [],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
