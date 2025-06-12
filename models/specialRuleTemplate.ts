export type GenreType = 'melee' | 'law' | 'bandit' | 'personality'| 'ranged' | 'tough' | 'cowardly' | 'stealthy' | 'heroic' | 'veteran' | 'greenhorn'
export interface SpecialRuleTemplate {
	specialRuleId: string;
	name: string;
	description: string;
	points: number;
	maxUsage?: number; // if not null, then this is a permanent special rule
	weaponRule?: boolean;
	genre: GenreType[]
}

export interface SpecialRule extends SpecialRuleTemplate {
	currentUsage?: number;
}