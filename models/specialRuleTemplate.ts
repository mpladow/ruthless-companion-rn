export interface SpecialRuleTemplate {
	specialRuleId: string;
	name: string;
	description: string;
	points: number;
	maxUsage?: number; // if not null, then this is a permanent special rule
	weaponRule?: boolean;
}

export interface SpecialRule extends SpecialRuleTemplate {
	currentUsage?: number;
}