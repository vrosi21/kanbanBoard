export interface WorkspaceInfo {
	id: string;
	title: string;
}

export interface Workspace {
	id: string;
	title: string;
	arrayOfBoards: Board[];
}
export interface Board {
	id: string;
	title: string;
	colour: string;
	arrayOfNotes: Note[];
}
export interface Note {
	id: string;
	description: string;
	colour: string;
	created: string;
	reminder: string;
}
