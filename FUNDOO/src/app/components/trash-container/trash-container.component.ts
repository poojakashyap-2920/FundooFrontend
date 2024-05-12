import { Component, OnInit } from '@angular/core';
import { NoteObj } from 'src/assets/type';
import { NoteService } from '../../services/noteService/note.service';
import { error } from 'console';

@Component({
  selector: 'app-trash-container',
  templateUrl: './trash-container.component.html',
  styleUrls: ['./trash-container.component.scss']
})
export class TrashContainerComponent implements OnInit {

  notesList: NoteObj[]=[];
  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.noteService.getAllNotesCall().subscribe(
      (res:any)=>{
        console.log(res);
        this.notesList=res.data.filter((note:NoteObj)=>note.isTrash==true);
      },
      (error:any)=>{
        console.error(error);
      }
    );
  }
  

  updateNotesList($event: { action: string, data: NoteObj }) {
    if ($event.action === "trash") {
      this.notesList = this.notesList.filter(note => note.noteId != $event.data.noteId);
    }
  } 

}
