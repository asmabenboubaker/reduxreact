import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./reducers";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage"; //Storage Engine
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: "root",
    storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducers);
const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk, /*...*/],
});

const persistor = persistStore(store, null, () => {
  // ici vous pouvez mettre à jour les données stockées dans le localStorage après chaque modification du store
  const state = store.getState();
  const products = state.products;
  storage.setItem('persist:root', JSON.stringify({ ...state, products }));
});

export { store, persistor };

