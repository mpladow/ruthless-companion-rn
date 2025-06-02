export interface BodyPartTemplate {
	bodyPartTemplateId: string;
	name: string;
	order: number;
	maxHealth: number;
}

export interface BodyPart extends BodyPartTemplate {
	id: string;
	currentDamage: number
}