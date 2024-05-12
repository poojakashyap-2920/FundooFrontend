import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Action } from 'rxjs/internal/scheduler/Action';
import { NoteService } from 'src/app/services/noteService/note.service';
import { ARCHIVE_ICON, BRUSH_ICON, COLLABRATOR_ICON, COLOR_PALATTE_ICON, IMG_ICON, LIST_VIEW_ICON, MORE_ICON, PIN_ICON, REMINDER_ICON } from 'src/assets/svg-icons';
import { NoteObj } from 'src/assets/type';

@Component({
  selector: 'app-create-note',
  templateUrl:'./create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {

  title: string = ""
  description: string = ""

  createNote : boolean=false;
  showMsg: boolean = false; 

  @Output() handleUpdateList=new EventEmitter<{action: string, data: NoteObj}>()
  IsArchive: any;
  IsTrash: boolean=false;
  IsPinned:boolean=false
  noteId: any;
  IsColour: string="#ffffff";
  emailId: any;
 


  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,private noteService:NoteService) {
    iconRegistry.addSvgIconLiteral("list-icon", sanitizer.bypassSecurityTrustHtml(LIST_VIEW_ICON)),
    iconRegistry.addSvgIconLiteral("brush-icon", sanitizer.bypassSecurityTrustHtml(BRUSH_ICON)),
    iconRegistry.addSvgIconLiteral("image-icon", sanitizer.bypassSecurityTrustHtml(IMG_ICON)),
    iconRegistry.addSvgIconLiteral("reminder-icon", sanitizer.bypassSecurityTrustHtml(REMINDER_ICON))
    iconRegistry.addSvgIconLiteral("collabrator-icon", sanitizer.bypassSecurityTrustHtml(COLLABRATOR_ICON))
    iconRegistry.addSvgIconLiteral("color-icon", sanitizer.bypassSecurityTrustHtml(COLOR_PALATTE_ICON))
    iconRegistry.addSvgIconLiteral("pin-icon", sanitizer.bypassSecurityTrustHtml(PIN_ICON))
    iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON))
    iconRegistry.addSvgIconLiteral('more-icon', sanitizer.bypassSecurityTrustHtml(MORE_ICON))
  }

  ngOnInit(): void {
  }

/***************************************** */
  // handleCreateNote(value:String){
  //   // if(value=='close')
  //   //   {
  //   //     this.noteService.createNoteApiCall({title:this.title,description:this.description}).subscribe(res=>{
  //   //       this.updateList.emit(res)
  //   //     })
  //   //   }
    



  //   // this.createNote=!this.createNote
  //   this.showMsg=!this.showMsg
  // }

  //***************************************************** */

  handleCreateNote(action: string){
    this.showMsg = !this.showMsg

    if(action === 'open' || this.title==="" || this.description==="") return

    this.noteService.createNoteApiCall({title: this.title, description: this.description}).subscribe(res => {
      console.log(res.data)
      this.handleUpdateList.emit({action: "create", data: res.data})
      })
  }

  // handleCreateNote(action: string){
  //   if(action==='close')
  //     {
  //       const NoteObj ={
  //         "title": this.title,
  //         "description": this.description,
  //         "IsArchive": this.IsArchive, // Add a comma here
  //         "IsTrash": this.IsTrash,
  //         "IsPinned": this.IsPinned,
  //         "noteId": this.noteId,
  //         "IsColour": this.IsColour,
  //         "emailId": this.emailId
  //       }
  //       this.noteService.createNoteApiCall(NoteObj).subscribe(res => {
  //         console.log(res.data)
  //         this.handleUpdateList.emit({action: "create", data: res.data})
  //       })
  //       this.title = "";
  //       this.description = "";
  //       this.IsArchive = false;
  //       this.IsColour = "#ffffff";
  //       this.IsPinned = false;
  //       this.IsTrash = false;
  //     }
}

  
  
  

