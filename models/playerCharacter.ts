import { CharacterTemplate } from './character';
import { Weapon } from './weapon';

export interface PlayerCharacter extends CharacterTemplate {
	playerCharacterId: string;
	name: string;
	specialRules: any[];
	currentWeapon: Weapon;
	legWoundsCurrent: number;
	armsWouldsCurrent: number;
	chestWoundsCurrent: number;
	severeWoundsCurrent: number;
	originalTemplate?: CharacterTemplate;
}