import { combineReducers, configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cartRedux";

import userReducer from "./userSlice";

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
// import { PersistGate } from "redux-persist/integration/react";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers(
    { user: userReducer, cart: cartReducer }
) //helps to combine all the reducer on a single rootReducer now the state wont chnage even after ref

const persistedReducer = persistReducer(persistConfig, rootReducer);

//a single store will take multiple reducers from different slices and will distrubute globally throughout the application hence we can use this deafult function anywhere in the app without needing its exact name thats why we can only make single deafult in an app

export const store = configureStore({
    
  reducer:  persistedReducer
  , //we combined the reducers
  // reducer: {
  //   cart: cartReducer,
  //   user: persistedReducer,
  // },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
//the next step after the store is to wrap the App compoennt around a provider with the store set to the current deafult export of this module
