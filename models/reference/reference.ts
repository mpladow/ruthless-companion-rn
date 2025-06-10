import { Section } from './section';

export interface Reference {
	id: string;
	title: string;
	subtitle?: string;
	description?: string;
	headerImage?: string;
	authors?: string[];
	credits?: string[];
	sections?: Section[];
	backgroundImage?: string;
	subscriptionId: string;
	order: number;
}