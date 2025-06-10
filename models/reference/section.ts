
export interface Section {
	id: string;
	title: string;
	subtitle?: string;
	content: string;
	order: number;// the order in the reference it goes in
	page: number;
}