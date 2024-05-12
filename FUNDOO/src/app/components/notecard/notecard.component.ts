
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/dataService/data.service';
import { NoteService } from 'src/app/services/noteService/note.service';
import { ARCHIVE_ICON, COLLABRATOR_ICON, COLOR_PALATTE_ICON, DELETE_FOREVER_ICON, IMG_ICON, MORE_ICON, PIN_ICON, REMINDER_ICON, RESTORE_ICON, TICK_ICON } from 'src/assets/svg-icons';
import { NoteObj } from 'src/assets/type';

@Component({
  selector: 'app-notecard',
  templateUrl:'./notecard.component.html',
  styleUrls: ['./notecard.component.scss']
})
export class NoteCardComponent implements OnInit {

  @Input() noteObjList!: NoteObj[];
  @Output() handleUpdateList = new EventEmitter<{action: string, data: NoteObj}>()

  showfull:boolean=false;
  textbar:boolean=false;
  searchString:string=''
  @Input() container!: string
  subscription!:Subscription
  noteObj: any;
 
  
  constructor(private domSanitizer:DomSanitizer,private matIconRegistry:MatIconRegistry,private dataService:DataService,private noteService:NoteService) 
  {
    matIconRegistry.addSvgIconLiteral("reminder-icon", domSanitizer.bypassSecurityTrustHtml(REMINDER_ICON))
    matIconRegistry.addSvgIconLiteral("colabrator-icon", domSanitizer.bypassSecurityTrustHtml(COLLABRATOR_ICON))
    matIconRegistry.addSvgIconLiteral("color-plate-icon", domSanitizer.bypassSecurityTrustHtml(COLOR_PALATTE_ICON))
    matIconRegistry.addSvgIconLiteral("img-icon", domSanitizer.bypassSecurityTrustHtml(IMG_ICON))
    matIconRegistry.addSvgIconLiteral("archieve-icon", domSanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON))
    matIconRegistry.addSvgIconLiteral("more-icon", domSanitizer.bypassSecurityTrustHtml(MORE_ICON))
    matIconRegistry.addSvgIconLiteral("pin-icon", domSanitizer.bypassSecurityTrustHtml(PIN_ICON))
    matIconRegistry.addSvgIconLiteral("tick-icon", domSanitizer.bypassSecurityTrustHtml(TICK_ICON))
    matIconRegistry.addSvgIconLiteral("delete-icon", domSanitizer.bypassSecurityTrustHtml(DELETE_FOREVER_ICON))
    matIconRegistry.addSvgIconLiteral("restore-icon", domSanitizer.bypassSecurityTrustHtml(RESTORE_ICON))

  }

  ngOnInit(): void {
    console.log(this.noteObjList); 
    this.subscription=this.dataService.currSearchString.subscribe(res=>this.searchString=res)

  }



//  handleNoteIconsClick(action: string, data: NoteObj) {
//   if (action === "archive") {
//     this.noteService.archiveApiCall(data.noteId || 0).subscribe(() => {
//       this.handleUpdateList.emit({ action: action, data: data })
//     });
//   }
//   else if(action==="trash")
//     {
//       this.noteService.TrashNoteApiCall(data.noteId || 0).subscribe(()=>{
//         this.handleUpdateList.emit({action:action,data: data})
//       },(err:any)=>console.log(err));
//     }
//     else if(action==="delete")
//       {
//         this.noteService.DeleteNoteApiCall(data.noteId || 0).subscribe(()=>{
//           this.handleUpdateList.emit({action:action,data: data})
//         },(err:any)=>console.log(err));
//       }
//       else{
//         this.noteService.UpdateColorApiCall(data.noteId || 0, action).subscribe(res=>this.handleUpdateList.emit({action:"colour",data:{...data, isColour:action}})
  
//         )
//       }
//   }
   
handleNoteIconsClick(action: string, data: NoteObj) {
  if (action === "archive") {
    this.noteService.archiveApiCall(data.noteId || 0).subscribe(() => {
      this.handleUpdateList.emit({ action: action, data: data });
    });
  } else if (action === "trash") {
    this.noteService.TrashNoteApiCall(data.noteId || 0).subscribe(() => {
      this.handleUpdateList.emit({ action: action, data: data });
    }, (err: any) => console.log(err));
  } else if (action === "delete") {
    this.noteService.DeleteNoteApiCall(data.noteId || 0).subscribe(() => {
      this.handleUpdateList.emit({ action: action, data: data });
    }, (err: any) => console.log(err));
  } else {
    this.noteService.UpdateColorApiCall(data.noteId || 0, action).subscribe(res => {
      this.handleUpdateList.emit({ action: "color", data: { ...data, isColour: action } });
    }, (err: any) => console.log(err));
  }
}

      
}



