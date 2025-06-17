import { PlayerCharacter } from '@/models/playerCharacter'
import { BP_ARM_instance, BP_CHEST_instance, BP_LEGS_instance, BP_SEVERE_instance } from '../body_parts'
import { SPEC_RULE_COOL_HAND, SPEC_RULE_DIRTY_CHEAT, SPEC_RULE_DRUNK, SPEC_RULE_NERVOUS, SPEC_RULE_ROUGHASNAILS, SPEC_RULE_STUBBORN, SPEC_RULE_TRIGGERFINGER, SPEC_RULE_UNPREPARED } from '../special_rules'
import { WPN_DERRINGER, WPN_REPEATER, WPN_REVOLVER, WPN_SHARPS, WPN_SHOTGUN } from '../weapons'

export const DUMMY_CHARACTER_1: PlayerCharacter = {
	playerCharacterId: 'dsfsdf',
	name: 'John Wayne',
	specialRules: [SPEC_RULE_ROUGHASNAILS, SPEC_RULE_TRIGGERFINGER],
	bodyParts: [BP_SEVERE_instance, BP_CHEST_instance, BP_ARM_instance, BP_LEGS_instance],
	characterTemplateId: "0",
	toughness: 4,
	startingWeapons: [WPN_REVOLVER, WPN_SHARPS],
	currentWeapons: [WPN_REVOLVER, WPN_SHARPS],
	gender: 'male',
	isCustom: false,
	order: 0
}
export const DUMMY_CHARACTER_2: PlayerCharacter = {
	playerCharacterId: 'dummycharacter2',
	name: 'Clint Eastwood',
	specialRules: [SPEC_RULE_ROUGHASNAILS],
	bodyParts: [BP_SEVERE_instance, BP_CHEST_instance, BP_ARM_instance, BP_LEGS_instance],
	characterTemplateId: "0",
	toughness: 8,
	startingWeapons: [WPN_SHOTGUN],
	currentWeapons: [WPN_SHOTGUN],
	gender: 'male',
	isCustom: false,
	order: 0
}
export const DUMMY_CHARACTER_3: PlayerCharacter = {
	playerCharacterId: 'dummycharacter3',
	name: 'Richard Harris',
	specialRules: [],
	bodyParts: [BP_SEVERE_instance, BP_CHEST_instance, BP_ARM_instance, BP_LEGS_instance],
	characterTemplateId: "0",
	toughness: 8,
	startingWeapons: [WPN_REPEATER],
	currentWeapons: [WPN_REPEATER],
	gender: 'male',
	isCustom: false,
	order: 0
}
export const BAT_MASTERSON: PlayerCharacter = {
	playerCharacterId: 'b_masterson',
	name: 'Bat Masterson',
	specialRules: [SPEC_RULE_ROUGHASNAILS, SPEC_RULE_TRIGGERFINGER],
	bodyParts: [BP_SEVERE_instance, BP_CHEST_instance, BP_ARM_instance, BP_LEGS_instance],
	characterTemplateId: "0",
	toughness: 3,
	startingWeapons: [WPN_REVOLVER, WPN_DERRINGER],
	currentWeapons: [WPN_REVOLVER, WPN_DERRINGER],
	scenario: "Dodge City Draw",
	gender: 'male',
	isCustom: false,
	order: 0
}

export const JIM_MASTERSON: PlayerCharacter = {
	playerCharacterId: 'j_masterson',
	name: 'Jim Masterson',
	specialRules: [SPEC_RULE_TRIGGERFINGER],
	bodyParts: [BP_SEVERE_instance, BP_CHEST_instance, BP_ARM_instance, BP_LEGS_instance],
	characterTemplateId: "0",
	toughness: 5,
	startingWeapons: [WPN_REVOLVER],
	currentWeapons: [WPN_REVOLVER],
	scenario: "Dodge City Draw",
	gender: 'male',
	isCustom: false,
	order: 0
}
export const TOM_MIXON: PlayerCharacter = {
	playerCharacterId: 't_mixon',
	name: 'Tom Mixon',
	title: 'Deputy',
	specialRules: [SPEC_RULE_COOL_HAND],
	bodyParts: [BP_SEVERE_instance, BP_CHEST_instance, BP_ARM_instance, BP_LEGS_instance],
	characterTemplateId: "0",
	toughness: 5,
	startingWeapons: [WPN_REVOLVER],
	currentWeapons: [WPN_REVOLVER],
	scenario: "Dodge City Draw",
	gender: 'male',
	isCustom: false,
	order: 0
}

export const AJ_PEACOCK: PlayerCharacter = {
	playerCharacterId: 'aj_peacock',
	name: 'AJ Peacock',
	specialRules: [SPEC_RULE_NERVOUS],
	bodyParts: [BP_SEVERE_instance, BP_CHEST_instance, BP_ARM_instance, BP_LEGS_instance],
	characterTemplateId: "0",
	toughness: 5,
	startingWeapons: [WPN_REVOLVER],
	currentWeapons: [WPN_REVOLVER],
	scenario: "Dodge City Draw",
	gender: 'male',
	isCustom: false,
	order: 0
}

export const AL_UPDEGRAFF: PlayerCharacter = {
	playerCharacterId: 'al_updegraff',
	name: 'Al Updegraff',
	specialRules: [SPEC_RULE_DRUNK, SPEC_RULE_DIRTY_CHEAT],
	bodyParts: [BP_SEVERE_instance, BP_CHEST_instance, BP_ARM_instance, BP_LEGS_instance],
	characterTemplateId: "0",
	toughness: 5,
	startingWeapons: [WPN_REVOLVER],
	currentWeapons: [WPN_REVOLVER],
	scenario: "Dodge City Draw",
	gender: 'male',
	isCustom: false,
	order: 0
}

export const CHALKEY_BEESON: PlayerCharacter = {
	playerCharacterId: 'c_Beeson',
	name: 'Chalkey Beeson',
	specialRules: [SPEC_RULE_STUBBORN],
	bodyParts: [BP_SEVERE_instance, BP_CHEST_instance, BP_ARM_instance, BP_LEGS_instance],
	characterTemplateId: "0",
	toughness: 5,
	startingWeapons: [WPN_SHOTGUN],
	currentWeapons: [WPN_SHOTGUN],
	scenario: "Dodge City Draw",
	gender: 'male',
	isCustom: false,
	order: 0
}
export const FRED_SINGER: PlayerCharacter = {
	playerCharacterId: 'f_singer',
	name: 'Fred Singer',
	specialRules: [SPEC_RULE_UNPREPARED],
	bodyParts: [BP_SEVERE_instance, BP_CHEST_instance, BP_ARM_instance, BP_LEGS_instance],
	characterTemplateId: "0",
	toughness: 5,
	startingWeapons: [WPN_REVOLVER],
	currentWeapons: [WPN_REVOLVER],
	scenario: "Dodge City Draw",
	gender: 'male',
	isCustom: false,
	order: 0
}

export const BONNY: PlayerCharacter = {
	playerCharacterId: 'bonny+test',
	name: 'Bonny Test',
	specialRules: [SPEC_RULE_UNPREPARED],
	bodyParts: [BP_SEVERE_instance, BP_CHEST_instance, BP_ARM_instance, BP_LEGS_instance],
	characterTemplateId: "0",
	toughness: 5,
	startingWeapons: [WPN_REVOLVER],
	currentWeapons: [WPN_REVOLVER],
	scenario: "Dodge City Draw",
	gender: 'female',
	isCustom: false,
	order: 0
}

export default [FRED_SINGER, CHALKEY_BEESON, AL_UPDEGRAFF, AJ_PEACOCK, TOM_MIXON, JIM_MASTERSON, BAT_MASTERSON] as PlayerCharacter[]
