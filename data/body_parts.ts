import { BodyPart, BodyPartTemplate } from '@/models/bodyParttemplate'

export const BP_SEVERE: BodyPartTemplate = {
	bodyPartTemplateId: '1',
	name: 'Severe',
	order: 0,
	maxHealth: 2
}
export const BP_CHEST: BodyPartTemplate = {
	bodyPartTemplateId: '2',
	name: 'Chest',
	order: 0,
	maxHealth: 2
}
export const BP_ARM: BodyPartTemplate = {
	bodyPartTemplateId: '3',
	name: 'Arm',
	order: 0,
	maxHealth: 3
}
export const BP_LEGS: BodyPartTemplate = {
	bodyPartTemplateId: '4',
	name: 'Leg',
	order: 0,
	maxHealth: 3
}

export const BP_SEVERE_instance: BodyPart = {
	bodyPartTemplateId: '1',
	name: 'Severe',
	order: 0,
	maxHealth: 2,
	currentDamage: 0,
	id: '1'
}
export const BP_CHEST_instance: BodyPart = {
	bodyPartTemplateId: '2',
	name: 'Chest',
	order: 0,
	maxHealth: 2,
	currentDamage: 0,
	id: '2'
}
export const BP_ARM_instance: BodyPart = {
	bodyPartTemplateId: '3',
	name: 'Arm',
	order: 0,
	maxHealth: 3,
	currentDamage: 0,
	id: '3'
}
export const BP_LEGS_instance: BodyPart = {
	bodyPartTemplateId: '4',
	name: 'Leg',
	order: 0,
	maxHealth: 3,
	currentDamage: 0,
	id: '4'
}