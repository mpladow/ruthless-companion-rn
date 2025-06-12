import { BodyPart } from './bodyParttemplate';
import { CharacterTemplate } from './characterTemplate';
import { SpecialRule } from './specialRuleTemplate';
import { Weapon } from './weapon';

export interface PlayerCharacter extends CharacterTemplate {
	playerCharacterId: string;
	title?: string;
	faction?: string;
	name: string;
	specialRules: SpecialRule[];
	currentWeapons?: Weapon[];
	bodyParts: BodyPart[]
	originalTemplateId?: string;
	order: number;
}