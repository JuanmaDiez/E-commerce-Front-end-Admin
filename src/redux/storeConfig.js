import { combineReducers, configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import allAdminReducer from "./allAdminsSlice";
import productReducer from "./productsSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  admin: adminReducer,
  allAdmin: allAdminReducer,
  product: productReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

const persistor = persistStore(store);

export { store, persistor };
