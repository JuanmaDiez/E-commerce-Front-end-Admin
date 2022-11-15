import adminReducer from "./adminSlice";
import allAdminReducer from "./allAdminsSlice";
import productReducer from "./productsSlice";
import orderReducer from "./orderSlice";
import categoryReducer from "./categorySlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  admin: adminReducer,
  order: orderReducer,
  category: categoryReducer,
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
