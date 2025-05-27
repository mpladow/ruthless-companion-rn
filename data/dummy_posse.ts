import { PlayerCharacter } from '@/models/playerCharacter';
import { Posse } from '@/models/posse';
import { SpecialRule } from '@/models/specialRule';
import { Weapon } from '@/models/weapon';


const SPEC_RULE_FANFIRE: SpecialRule = {
	specialRuleId: "1",
	name: "Fanfire",
	description: 'Fanfire allows up to 6 rounds to be fired in a single action at Sort Range, but "10s" are needed to hit.',
	positivePoints: 0,
	negativePoints: 0
}

const WPN_REVOLVER: Weapon = {
	weaponId: 1,
	name: "Revolver",
	maxAmmunition: 6,
	shortRange: 8,
	longRange: 12,
	specialRules: [SPEC_RULE_FANFIRE]
}
const DUMMY_CHARACTER_1: PlayerCharacter = {
	playerCharacterId: '',
	name: '',
	specialRules: [],
	legWoundsCurrent: 0,
	armsWouldsCurrent: 0,
	chestWoundsCurrent: 0,
	severeWoundsCurrent: 0,
	characterTemplateId: 0,
	toughness: 0,
	startingWeapon: WPN_REVOLVER,
	legWoundsMax: 0,
	armsWouldsMax: 0,
	chestWoundsMax: 0,
	severeWoundsMax: 0
}
export const DUMMY_DATA: Posse = {
	posseId: 'dfdf',
	name: 'The Wet Bandits',
	members: [DUMMY_CHARACTER_1, DUMMY_CHARACTER_1, DUMMY_CHARACTER_1, DUMMY_CHARACTER_1, DUMMY_CHARACTER_1],
}