import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/noteService/note.service';
import { NoteObj } from 'src/assets/type';

@Component({
  selector: 'app-archive-container',
  templateUrl: './archive-container.component.html',
  styleUrls: ['./archive-container.component.scss']
})
export class ArchiveContainerComponent implements OnInit {
  notesList: NoteObj[] = [];

  constructor(private noteService:NoteService) { }

  ngOnInit(): void {
    this.noteService.getAllNotesCall().subscribe(
      (res: any) => {
        console.log(res);
        this.notesList = res.data.filter((note: NoteObj) => note.isArchive==true);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  updateNotesList($event: {action: string, data: NoteObj}) {
    
    if ($event.action === "unarchive" || $event.action == "trash") {
     this.notesList = this.notesList.filter(note => note.noteId != $event.data.noteId)
   }
 }


}
