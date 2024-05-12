export interface NoteObj {
    title?: string,
    description?: string,
    reminder?:Date
    isArchive?: boolean,
    isTrash?: boolean,
    isPinned?: boolean,
    noteId?: number,
    isColour?: string,
    
    emailId?:string
}