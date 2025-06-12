import { GenderType } from '@/components/features/GenderSwitcher/GenderSwitcher';
import { BodyPartTemplate } from './bodyParttemplate';
import { SpecialRule } from './specialRuleTemplate';
import { Weapon } from './weapon';

export interface CharacterTemplate {
	characterTemplateId: string;
	name: string;
	toughness: number;
	startingWeapons: Weapon[];
	specialRules: SpecialRule[];
	bodyParts: BodyPartTemplate[];
	isCustom: boolean;
	gender: GenderType;
	scenario?: string; // Optional field to indicate the scenario this character is associated with

}