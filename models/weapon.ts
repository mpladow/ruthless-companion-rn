import { SpecialRule } from './specialRule';

export interface Weapon {
	weaponId: number;
	name: string;
	maxAmmunition?: number;
	shortRange?: number;
	longRange?: number;
	specialRules: SpecialRule[];
}