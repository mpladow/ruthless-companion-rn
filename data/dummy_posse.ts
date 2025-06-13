import { PlayerCharacter } from '@/models/playerCharacter';
import { Posse } from '@/models/posse';
import { BP_ARM_instance, BP_CHEST_instance, BP_LEGS_instance, BP_SEVERE_instance } from './body_parts';
import { SPEC_RULE_ROUGHASNAILS, SPEC_RULE_TRIGGERFINGER } from './special_rules';
import { WPN_REPEATER, WPN_REVOLVER, WPN_SHARPS, WPN_SHOTGUN } from './weapons';






export const DUMMY_CHARACTER_1: PlayerCharacter = {
	playerCharacterId: 'dsfsdf',
	name: 'John Wayne',
	specialRules: [SPEC_RULE_ROUGHASNAILS, SPEC_RULE_TRIGGERFINGER],
	bodyParts: [BP_SEVERE_instance, BP_CHEST_instance, BP_ARM_instance, BP_LEGS_instance],
	characterTemplateId: '0',
	toughness: 4,
	startingWeapons: [WPN_REVOLVER, WPN_SHARPS],
	currentWeapons: [WPN_REVOLVER, WPN_SHARPS],
	gender: 'male',
	order: 0,
	isCustom: false
}
export const DUMMY_CHARACTER_2: PlayerCharacter = {
	playerCharacterId: 'dummycharacter2',
	name: 'Clint Eastwood',
	specialRules: [SPEC_RULE_ROUGHASNAILS],
	bodyParts: [BP_SEVERE_instance, BP_CHEST_instance, BP_ARM_instance, BP_LEGS_instance],
	characterTemplateId: '0',
	toughness: 8,
	startingWeapons: [WPN_SHOTGUN],
	currentWeapons: [WPN_SHOTGUN],
	gender: 'male',
	order: 1,
	isCustom: false
}
export const DUMMY_CHARACTER_3: PlayerCharacter = {
	playerCharacterId: 'dummycharacter3',
	name: 'Richard Harris',
	specialRules: [],
	bodyParts: [BP_SEVERE_instance, BP_CHEST_instance, BP_ARM_instance, BP_LEGS_instance],
	characterTemplateId: '0',
	toughness: 8,
	startingWeapons: [WPN_REPEATER],
	currentWeapons: [WPN_REPEATER],
	gender: 'male',
	order: 2,
	isCustom: false
}
export const DUMMY_DATA: Posse = {
	posseId: 'dfdf',
	name: 'The Wet Bandits',
	members: [DUMMY_CHARACTER_1, DUMMY_CHARACTER_2, DUMMY_CHARACTER_3],
}