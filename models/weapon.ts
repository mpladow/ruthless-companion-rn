import { SpecialRuleTemplate } from './specialRuleTemplate';

export interface WeaponTemplate {
	weaponId: number;
	name: string;
	maxAmmunition: number;
	shortRange?: number;
	longRange?: number;
	specialRules: SpecialRuleTemplate[];
	weaponTemplateId: number;
	description?: string;
	image?: string;
}

export interface Weapon extends WeaponTemplate {
	currentAmmunition: number
}