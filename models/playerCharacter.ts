import { BodyPart } from './bodyParttemplate';
import { CharacterTemplate } from './characterTemplate';
import { Weapon } from './weapon';

export interface PlayerCharacter extends CharacterTemplate {
	playerCharacterId: string;
	name: string;
	specialRules: any[];
	currentWeapon?: Weapon;
	bodyParts: BodyPart[]
	originalTemplate?: CharacterTemplate;
}