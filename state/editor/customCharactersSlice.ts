import { CharacterTemplate } from '@/models/characterTemplate';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: CharacterTemplate[] = []

const customCharactersSlice = createSlice({
	name: 'customCharacters',
	initialState: initialState,
	reducers: {
		addCustomCharacter: (state, { payload }: PayloadAction<CharacterTemplate>) => {
			console.log("🚀 ~ dsfsdfdsf state:", state)
			console.log("🚀 ~ dsfsdfdsf action:", payload)
			state.push(payload);

		},
		deleteCustomCharacter: (state, action: PayloadAction<string>) => {
			const index = state.findIndex(character => character.characterTemplateId === action.payload);
			if (index !== -1) {
				state.splice(index, 1);
			}
		}
	}
})
export const { addCustomCharacter, deleteCustomCharacter } = customCharactersSlice.actions;

export default customCharactersSlice.reducer;
