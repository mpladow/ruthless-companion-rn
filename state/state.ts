import { configureStore } from '@reduxjs/toolkit';
import posseReducer from './posse/posseSlice';
import userPossesReducer from './posse/userPossesSlice';
export const store = configureStore({
	reducer: {
		selectedPosse: posseReducer,
		userPosses: userPossesReducer
	}
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch