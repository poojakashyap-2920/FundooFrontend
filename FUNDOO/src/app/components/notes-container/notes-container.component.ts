import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/noteService/note.service';
import { NoteObj } from 'src/assets/type';

@Component({
  selector: 'app-notes-container',
  templateUrl: './notes-container.component.html',
  styleUrls: ['./notes-container.component.scss'],
  host : {
    class : "app-notes-container-cnt"
  }
})
export class NotesContainerComponent implements OnInit {
  notesList: NoteObj[] = [];

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.noteService.getAllNotesCall().subscribe(
      (res: any) => {
        console.log(res);
      
        this.notesList = res.data.filter((note: NoteObj) => !note.isArchive && !note.isArchive);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

 

//   handleUpdateNoteList($event:{action:string,data:any}){
//     console.log("event",$event);
//     if($event.action=="create"){
//       this.notesList=[...this.notesList,$event.data]
//      // this.notesList=[...this.notesList,$event.data] // if you return only one object format that time newly created note not able to add so use ... create one array to store old all the notes after that at last newly created note addad
//     }
//     else if($event.action==="archive" || $event.action == "trash" || $event.action == "unarchive"){
//         this.notesList=this.notesList.filter((ele:any)=>ele.userNotesId != $event.data.userNotesId)
//       }
//       else if($event.action=="delete"){
//         this.notesList=this.notesList.filter((ele:any)=>ele.userNotesId !== $event.data.userNotesId)
//       }
//       else if($event.action=="color" || $event.action=="update"){
//         this.notesList=this.notesList.map((ele:any)=>{
//           if(ele.userNotesId==$event.data.userNotesId){
//                  return $event.data
//           }
//           else{
//             return ele;
//           }
//         })
//       }
//   }




handleUpdateNoteList($event: { action: string, data: any }) {
  console.log("event", $event);
  if ($event.action === "create") {
    this.notesList = [...this.notesList, $event.data];
  } else if ($event.action === "archive" || $event.action === "trash" || $event.action === "unarchive") {
    // Remove the note from the notesList based on its userNotesId
    this.notesList = this.notesList.filter((ele: any) => ele.userNotesId !== $event.data.userNotesId);
  } else if ($event.action === "delete") {
    // In case of delete, just remove the note from the notesList
    this.notesList = this.notesList.filter((ele: any) => ele.userNotesId !== $event.data.userNotesId);
  } else if ($event.action === "color" || $event.action === "update") {
    // Update the note in notesList if action is color or update
    this.notesList = this.notesList.map((ele: any) => {
      if (ele.userNotesId === $event.data.userNotesId) {
        return $event.data;
      } else {
        return ele;
      }
    });
  }
}


}
