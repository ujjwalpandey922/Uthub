import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./UserSlice";
import videoSlice from "./VideoSlice";
//persisting user needs all this
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
import { PersistGate } from "redux-persist/integration/react";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
// need root reducer to combine them
const rootReducer = combineReducers({ user: userSlice, video: videoSlice });
// persist them using
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  //middleware needed or it will give error
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
// ---Store
// --------user(user:userSlice ) ye uper wala uske under
// -------------currentUser,Loading,Error
