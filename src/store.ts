import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { indexApi } from './features/indexApi';
import cartReducer from './features/cart/cartSlice';
import authReducer from './features/auth/authSlice';
import { persistReducer, persistStore, PURGE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const combinedReducers = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  [indexApi.reducerPath]: indexApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedState = persistReducer(persistConfig, combinedReducers);

export const store = configureStore({
  reducer: persistedState,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PURGE],
      },
    }).concat(indexApi.middleware),
  devTools: true,
});

export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
