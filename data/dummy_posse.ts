import { PlayerCharacter } from '@/models/playerCharacter';
import { Posse } from '@/models/posse';
import { SpecialRule } from '@/models/specialRule';
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
	weaponRule: true
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
const DUMMY_CHARACTER_1: PlayerCharacter = {
	playerCharacterId: 'dsfsdf',
	name: 'John Wayne',
	specialRules: [],
	legWoundsCurrent: 0,
	armsWouldsCurrent: 0,
	chestWoundsCurrent: 0,
	severeWoundsCurrent: 0,
	characterTemplateId: 0,
	toughness: 4,
	startingWeapon: WPN_REVOLVER,
	legWoundsMax: 0,
	armsWouldsMax: 0,
	chestWoundsMax: 0,
	severeWoundsMax: 0,
	currentWeapon: WPN_REVOLVER
}
const DUMMY_CHARACTER_2: PlayerCharacter = {
	playerCharacterId: 'dummycharacter2',
	name: 'Clint Eastwood',
	specialRules: [],
	legWoundsCurrent: 0,
	armsWouldsCurrent: 0,
	chestWoundsCurrent: 0,
	severeWoundsCurrent: 0,
	characterTemplateId: 0,
	toughness: 8,
	startingWeapon: WPN_SHOTGUN,
	legWoundsMax: 3,
	armsWouldsMax: 3,
	chestWoundsMax: 2,
	severeWoundsMax: 2,
	currentWeapon: WPN_SHOTGUN
}
const DUMMY_CHARACTER_3: PlayerCharacter = {
	playerCharacterId: 'dummycharacter3',
	name: 'Richard Harris',
	specialRules: [],
	legWoundsCurrent: 0,
	armsWouldsCurrent: 0,
	chestWoundsCurrent: 0,
	severeWoundsCurrent: 0,
	characterTemplateId: 0,
	toughness: 8,
	startingWeapon: WPN_REPEATER,
	legWoundsMax: 3,
	armsWouldsMax: 3,
	chestWoundsMax: 2,
	severeWoundsMax: 2,
	currentWeapon: WPN_REPEATER
}
export const DUMMY_DATA: Posse = {
	posseId: 'dfdf',
	name: 'The Wet Bandits',
	members: [DUMMY_CHARACTER_1, DUMMY_CHARACTER_2, DUMMY_CHARACTER_3],
}