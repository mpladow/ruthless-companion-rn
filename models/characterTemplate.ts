import { BodyPartTemplate } from './bodyParttemplate';
import { Weapon } from './weapon';

export interface CharacterTemplate {
	characterTemplateId: number;
	toughness: number;
	startingWeapon: Weapon;
	bodyParts: BodyPartTemplate[]

}