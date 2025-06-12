import { Reference } from '@/models/reference/reference';
import { Section_1 } from './sections/1-sequenceOfPlay';
import { Section_10 } from './sections/10-fisticuffs';
import { Quote_2 } from './sections/11-quote2';
import { Section_12 } from './sections/12-toughness';
import { Quote_3 } from './sections/13-quote3';
import { Section_13 } from './sections/14-skedaddle';
import { Section_2 } from './sections/2-actions';
import { Section_3 } from './sections/3-moving';
import { Section_4 } from './sections/4-gotyoucovered';
import { Section_5 } from './sections/5-shooting';
import { Quote_1 } from './sections/6-quote1';
import { Section_7 } from './sections/7-weapons';
import { Section_8 } from './sections/8-snapshots';
import { Section_9 } from './sections/9-darnivebeenhit';


export const rules: Reference = {
	id: 'rules',
	title: 'Game Rules',
	authors: ["Mark Fastoso", "Brian DeWitt"],
	sections: [
		Section_1,
		Section_2,
		Section_3,
		Section_4,
		Quote_1,
		Section_5,
		Section_7,
		Section_8,
		Section_9,
		Section_10,
		Quote_2,
		Section_12,
		Quote_3,
		Section_13
	],
	subscriptionId: '',
	order: 0
};