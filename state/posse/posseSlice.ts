import { PlayerCharacter } from '@/models/playerCharacter';
import { Posse } from '@/models/posse';
import { SetHealthForBodyPart, SetSpecialRuleUsage, SetWeaponForCharacter } from '@/models/stateChange/posseSlice';
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
		setCurrentPosse: (state, { payload }: PayloadAction<Posse | undefined>) => {
			return payload;
		},
		addCharacterToPosseMembers: (state, { payload }: PayloadAction<PlayerCharacter[]>) => {
			if (state) {
				payload.map(character => {
					let updatedOrder = state.members.length + 1;
					state.members.push({...character, order: updatedOrder});
				})
			}
		},
		deleteCharacter: (state, action: PayloadAction<number>) => {
			if (state) {
				const index = state.members.findIndex(member => member.playerCharacterId === action.payload.toString());
				if (index !== -1) {
					state.members.splice(index, 1);
				}
			}
		},
		deleteMultipleCharacters: (state, action: PayloadAction<string[]>) => {
			if (state) {
				state.members = state.members.filter(member => !action.payload.includes(member?.playerCharacterId));
			}
		},
		setCurrentAmmoForWeapon: (state, action: PayloadAction<SetWeaponForCharacter>) => {
			if (state) {
				const member = state.members.find(x => x.playerCharacterId == action.payload.characterId);
				if (member) {
					const selectedWeapon = member.currentWeapons?.find(x => x.weaponId == action.payload.weapon.weaponId);
					if (selectedWeapon) {
						selectedWeapon.currentAmmunition = action.payload.weapon.currentAmmunition;
					}
				}
			}
		},
		setCurrentHealthToBodyPart: (state, action: PayloadAction<SetHealthForBodyPart>) => {
			if (state) {
				const member = state.members.find(x => x.playerCharacterId == action.payload.characterId);
				if (member) {
					const foundBodyPart = member.bodyParts.find(x => x.name == action.payload.bodyPart.name);
					if (foundBodyPart) {
						foundBodyPart.currentDamage = action.payload.bodyPart.currentDamage
					}
				}
			}
		},
		setSpecialRuleUsage: (state, action: PayloadAction<SetSpecialRuleUsage>) => {
			if (state) {
				const member = state.members.find(x => x.playerCharacterId == action.payload.characterId);
				if (member) {
					const foundSpecialRule = member.specialRules.find(x => x.specialRuleId == action.payload.specialRule.specialRuleId);
					if (foundSpecialRule && foundSpecialRule.maxUsage !== undefined) {
						foundSpecialRule.currentUsage = action.payload.specialRule.currentUsage
					}
				}
			}
		}
	}
})

export const { setCurrentPosse, addCharacterToPosseMembers, deleteCharacter, deleteMultipleCharacters, setCurrentAmmoForWeapon, setCurrentHealthToBodyPart, setSpecialRuleUsage } = posseSlice.actions;
export default posseSlice.reducer;