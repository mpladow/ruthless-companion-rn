import { BodyPart } from '../bodyParttemplate';
import { SpecialRule } from '../specialRuleTemplate';
import { Weapon } from '../weapon';

export interface SetWeaponForCharacter {
	weapon: Weapon;
	characterId: string;
}

export interface SetHealthForBodyPart {
	bodyPart: BodyPart;
	characterId: string;
}
export interface SetSpecialRuleUsage {
	specialRule: SpecialRule;
	characterId: string;
}