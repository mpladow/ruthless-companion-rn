import { BodyPart } from './bodyParttemplate';
import { CharacterTemplate } from './characterTemplate';
import { SpecialRule } from './specialRuleTemplate';
import { Weapon } from './weapon';

export interface PlayerCharacter extends CharacterTemplate {
	playerCharacterId: string;
	name: string;
	specialRules: SpecialRule[];
	currentWeapon?: Weapon;
	bodyParts: BodyPart[]
	originalTemplate?: CharacterTemplate;
}