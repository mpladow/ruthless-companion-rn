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
import customCharactersReducer from './editor/customCharactersSlice'; // assuming you have a customCharactersSlice
import posseReducer from './posse/posseSlice';
import userPossesReducer from './posse/userPossesSlice';

const rootReducer = combineReducers({
	selectedPosse: posseReducer,
	userPosses: userPossesReducer,
	customCharacters: customCharactersReducer, // assuming you have a customCharactersReducer
	// add more reducers here
});
const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	timeout: 1000,
	whitelist: ['userPosses', 'posse', 'customCharacters'], // reducers to persist
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