import { MatDrawer } from '@angular/material/sidenav';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/dataService/data.service';
import { MatDrawerMode } from '@angular/material/sidenav';
import { ARCHIVE_ICON, EDIT_ICON, NOTE_ICON, DELETE_FOREVER_ICON, OTHER_MENU_ICON, REMINDER_ICON, TRASH_ICON } from 'src/assets/svg-icons'; // Make sure you have imported your icons correctly

@Component({
   selector: 'app-notes-leftside',
  templateUrl: './notes-leftside.component.html',
  styleUrls: ['./notes-leftside.component.scss'],
  host: {
    class: "app-notes-leftside-cnt"
  }
})

export class NotesLeftsideComponent implements OnInit, OnDestroy {

  drawerState:boolean=false
  subscription!:Subscription
  constructor(private domSanitizer:DomSanitizer,private matIconRegistry:MatIconRegistry,private dataService:DataService) {
    matIconRegistry.addSvgIconLiteral("note-icon", domSanitizer.bypassSecurityTrustHtml(NOTE_ICON)),
    matIconRegistry.addSvgIconLiteral("reminder-icon", domSanitizer.bypassSecurityTrustHtml(REMINDER_ICON)),
    matIconRegistry.addSvgIconLiteral("edit-icon", domSanitizer.bypassSecurityTrustHtml(EDIT_ICON)),
    matIconRegistry.addSvgIconLiteral("archive-icon", domSanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON)),
    matIconRegistry.addSvgIconLiteral("trash-icon", domSanitizer.bypassSecurityTrustHtml(TRASH_ICON))
   }

  ngOnInit(): void {
    this.subscription= this.dataService.currDrawerState.subscribe(res=>this.drawerState=res)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}