import { PlayerCharacter } from '@/models/playerCharacter';
import { Posse } from '@/models/posse';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Posse = {
	posseId: '',
	name: '',
	members: []
};

const posseSlice = createSlice({
	name: 'posse',
	initialState: initialState,
	reducers: {
		setCurrentPosse: (state, { payload }: PayloadAction<Posse>) => {
			return payload;
		},
		addCharacterToPosseMembers: (state, { payload }: PayloadAction<PlayerCharacter>) => {
			if (state) {
				state.members.push(payload)
			}
		},
		deleteCharacter: (state, action: PayloadAction<number>) => {
			if (state) {
				const index = state.members.findIndex(member => member.playerCharacterId === action.payload.toString());
				if (index !== -1) {
					state.members.splice(index, 1);
				}
			}
		}
	}
})

export const { setCurrentPosse, addCharacterToPosseMembers, deleteCharacter } = posseSlice.actions;
export default posseSlice.reducer;