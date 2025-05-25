import { Weapon } from './weapon';

export interface CharacterTemplate {
	characterTemplateId: number;
	toughness: number;
	startingWeapon: Weapon;
	legWoundsMax: number;
	armsWouldsMax: number;
	chestWoundsMax:number;
	severeWoundsMax: number;

}