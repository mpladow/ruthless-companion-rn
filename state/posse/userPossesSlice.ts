import { DUMMY_DATA } from '@/data/dummy_posse';
import { PosseForm } from '@/models/forms/posseForm';
import { Posse } from '@/models/posse';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Posse[] = [];
const userPossesSlice = createSlice({
	name: 'userPosses',
	initialState: initialState,
	reducers: {
		createPosse: (state, action: PayloadAction<PosseForm>) => {
			const newPosse: Posse = {
				posseId: Date.now().toString(),
				name: action.payload.name,
				members: []
			};
			//state.push(newPosse);

			state.push(DUMMY_DATA);
		},
		deletePosse: (state, action: PayloadAction<string>) => {
			const index = state.findIndex(posse => posse.posseId === action.payload);
			if (index !== -1) {
				state.splice(index, 1);
			}
		},
		updatePosse: (state, action: PayloadAction<Posse>) => {
			const index = state.findIndex(posse => posse.posseId === action.payload.posseId);
			if (index !== -1) {
				state[index] = action.payload;
			}
		}
	}
})
export const { createPosse, deletePosse, updatePosse } = userPossesSlice.actions;
export default userPossesSlice.reducer;