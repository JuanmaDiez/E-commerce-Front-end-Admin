import { combineReducers, configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, adminReducer);

const store = configureStore({
  reducer: { admin: persistedReducer },
  middleware: [thunk],
});

const persistor = persistStore(store);

export { store, persistor };
