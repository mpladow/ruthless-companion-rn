import { SpecialRule } from './specialRule';

export interface WeaponTemplate {
	weaponId: number;
	name: string;
	maxAmmunition: number;
	shortRange?: number;
	longRange?: number;
	specialRules: SpecialRule[];
}

export interface Weapon extends WeaponTemplate {
	currentAmmunition: number
}