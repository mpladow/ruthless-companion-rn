export type AlignmentType = 'lawman' | 'bandit' | 'neutral'
export type SpecialityType = 'melee' | 'ranged' | 'tough' | 'stealthy' |'cowardly' | 'brave' |'veteran' | 'greenhorn' | 'regular'
export type TraitType = 'veteran' | 'greenhorn' | 'regular'

export interface SpecialRuleTemplate {
	specialRuleId: string;
	name: string;
	description: string;
	points: number;
	maxUsage?: number; // if not null, then this is a permanent special rule
	weaponRule?: boolean;
	alignmentType: AlignmentType[]
	specialityType: SpecialityType[];
	version: number
}

export interface SpecialRule extends SpecialRuleTemplate {
	currentUsage?: number;
}