import { BodyPartTemplate } from './bodyParttemplate';
import { Weapon } from './weapon';

export interface CharacterTemplate {
	characterTemplateId: number;
	toughness: number;
	startingWeapons: Weapon[];
	bodyParts: BodyPartTemplate[]

}