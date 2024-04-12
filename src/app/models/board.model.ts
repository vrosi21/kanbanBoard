export interface WorkspaceInfo {
	id: number;
	title: string;
}

export interface Workspace {
	id: number;
	title: string;
	arrayOfBoards: Board[];
}
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
