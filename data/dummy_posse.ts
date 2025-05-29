import { BodyPart, BodyPartTemplate } from '@/models/bodyParttemplate';
import { PlayerCharacter } from '@/models/playerCharacter';
import { Posse } from '@/models/posse';
import { SpecialRule } from '@/models/specialRuleTemplate';
import { Weapon } from '@/models/weapon';


const SPEC_RULE_FANFIRE: SpecialRule = {
	specialRuleId: "1",
	name: "Fanfire",
	description: 'Fanfire allows up to 6 rounds to be fired in a single action at Sort Range, but "10s" are needed to hit.',
	positivePoints: 0,
	negativePoints: 0,
	weaponRule: true
}
const SPEC_RULE_SHOTGUN: SpecialRule = {
	specialRuleId: "2",
	name: "+2 at Close, +1 at Long",
	description: 'At close range, damage is +2, whilst -1 at long range.',
	positivePoints: 0,
	negativePoints: 0,
	weaponRule: true
}
const SPEC_RULE_FREE_RELOAD: SpecialRule = {
	specialRuleId: "2",
	name: "Free Reload",
	description: 'Reloading costs no actions',
	positivePoints: 0,
	negativePoints: 0,
	weaponRule: true,
}
const SPEC_RULE_ROUGHASNAILS: SpecialRule = {
	specialRuleId: '6',
	name: 'Tough as Nails',
	description: 'Ignore First Wound',
	positivePoints: 2,
	negativePoints: 0,
	maxUsage: 1,
	currentUsage: 0
}
const SPEC_RULE_TRIGGERFINGER: SpecialRule = {
	specialRuleId: '7',
	name: 'Trigger Finger',
	description: '+1 Value to Snap Shot Cards',
	positivePoints: 2,
	negativePoints: 0,
	maxUsage: 1,
	currentUsage: 1
}

const WPN_REVOLVER: Weapon = {
	weaponId: 1,
	name: "Revolver",
	maxAmmunition: 6,
	shortRange: 8,
	longRange: 12,
	specialRules: [SPEC_RULE_FANFIRE],
	currentAmmunition: 6
}
const WPN_SHOTGUN: Weapon = {
	weaponId: 1,
	name: "Shotgun",
	maxAmmunition: 2,
	shortRange: 8,
	longRange: 12,
	specialRules: [SPEC_RULE_SHOTGUN],
	currentAmmunition: 2
}
const WPN_REPEATER: Weapon = {
	weaponId: 1,
	name: "Repeating Rifle",
	maxAmmunition: 10,
	shortRange: 10,
	longRange: 24,
	specialRules: [],
	currentAmmunition: 10
}

const BP_SEVERE: BodyPartTemplate = {
	bodyPartTemplateId: '1',
	name: 'Severe',
	order: 0,
	maxHealth: 2
}
const BP_CHEST: BodyPartTemplate = {
	bodyPartTemplateId: '2',
	name: 'Chest',
	order: 0,
	maxHealth: 2
}
const BP_ARM: BodyPartTemplate = {
	bodyPartTemplateId: '3',
	name: 'Arm',
	order: 0,
	maxHealth: 3
}
const BP_LEGS: BodyPartTemplate = {
	bodyPartTemplateId: '4',
	name: 'Leg',
	order: 0,
	maxHealth: 3
}

const BP_SEVERE_instance: BodyPart = {
	bodyPartTemplateId: '1',
	name: 'Severe',
	order: 0,
	maxHealth: 2,
	currentDamage: 0,
	id: '1'
}
const BP_CHEST_instance: BodyPart = {
	bodyPartTemplateId: '2',
	name: 'Chest',
	order: 0,
	maxHealth: 2,
	currentDamage: 0,
	id: '2'
}
const BP_ARM_instance: BodyPart = {
	bodyPartTemplateId: '3',
	name: 'Arm',
	order: 0,
	maxHealth: 3,
	currentDamage: 1,
	id: '3'
}
const BP_LEGS_instance: BodyPart = {
	bodyPartTemplateId: '4',
	name: 'Leg',
	order: 0,
	maxHealth: 3,
	currentDamage: 0,
	id: '4'
}

const DUMMY_CHARACTER_1: PlayerCharacter = {
	playerCharacterId: 'dsfsdf',
	name: 'John Wayne',
	specialRules: [SPEC_RULE_ROUGHASNAILS, SPEC_RULE_TRIGGERFINGER],
	bodyParts: [BP_SEVERE_instance, BP_CHEST_instance, BP_ARM_instance, BP_LEGS_instance],
	characterTemplateId: 0,
	toughness: 4,
	startingWeapon: WPN_REVOLVER,
	currentWeapon: WPN_REVOLVER
}
const DUMMY_CHARACTER_2: PlayerCharacter = {
	playerCharacterId: 'dummycharacter2',
	name: 'Clint Eastwood',
	specialRules: [SPEC_RULE_ROUGHASNAILS],
	bodyParts: [BP_SEVERE_instance, BP_CHEST_instance, BP_ARM_instance, BP_LEGS_instance],
	characterTemplateId: 0,
	toughness: 8,
	startingWeapon: WPN_SHOTGUN,
	currentWeapon: WPN_SHOTGUN
}
const DUMMY_CHARACTER_3: PlayerCharacter = {
	playerCharacterId: 'dummycharacter3',
	name: 'Richard Harris',
	specialRules: [],
	bodyParts: [BP_SEVERE_instance, BP_CHEST_instance, BP_ARM_instance, BP_LEGS_instance],
	characterTemplateId: 0,
	toughness: 8,
	startingWeapon: WPN_REPEATER,
	currentWeapon: WPN_REPEATER
}
export const DUMMY_DATA: Posse = {
	posseId: 'dfdf',
	name: 'The Wet Bandits',
	members: [DUMMY_CHARACTER_1, DUMMY_CHARACTER_2, DUMMY_CHARACTER_3],
}