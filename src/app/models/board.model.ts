export interface Board {
	id: number;
	title: string;
	colour: string;
	arrayOfNotes: Note[];
}
export interface Note {
	id: number;
	description: string;
	colour: string;
	created: string;
	reminder: string;
}
