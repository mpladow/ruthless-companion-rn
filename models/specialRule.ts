export interface SpecialRule {
	specialRuleId: string;
	name: string;
	description: string;
	positivePoints: number;
	negativePoints: number;
	maxUsage?: number; // if not null, then this is a permanent special rule
}