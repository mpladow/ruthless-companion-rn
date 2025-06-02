import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE,
} from 'redux-persist';
import posseReducer from './posse/posseSlice';
import userPossesReducer from './posse/userPossesSlice';

const rootReducer = combineReducers({
	selectedPosse: posseReducer,
	userPosses: userPossesReducer
	// add more reducers here
});
const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	timeout: 1000,
	whitelist: ['userPosses', 'posse'], // reducers to persist
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				// redux-persist needs these to be ignored
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
})


export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch