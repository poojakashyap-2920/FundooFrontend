import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

import { DataService } from 'src/app/services/dataService/data.service';

import {OTHER_MENU_ICON,MENU_ICON,SEARCH_ICON ,REFRESH_ICON,LIST_VIEW_ICON,SETTING_ICON,MORE_ICON} from 'src/assets/svg-icons';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnDestroy {
handleSearchString() {
throw new Error('Method not implemented.');
}
  drawerState:boolean=false;
  subscription!:Subscription
  searchString: string = ''
  title:any
  Email:any
  Name:any
  constructor(private domSanitizer:DomSanitizer,private matIconRegistry:MatIconRegistry,private dataService : DataService,private route:Router) { 
    matIconRegistry.addSvgIconLiteral("menu-icon", domSanitizer.bypassSecurityTrustHtml(MENU_ICON)),
    matIconRegistry.addSvgIconLiteral("search-icon", domSanitizer.bypassSecurityTrustHtml(SEARCH_ICON)),
    matIconRegistry.addSvgIconLiteral("refresh-icon", domSanitizer.bypassSecurityTrustHtml(REFRESH_ICON)),
    matIconRegistry.addSvgIconLiteral("setting-icon", domSanitizer.bypassSecurityTrustHtml(SETTING_ICON))
    matIconRegistry.addSvgIconLiteral("list-view-icon", domSanitizer.bypassSecurityTrustHtml(LIST_VIEW_ICON))
    matIconRegistry.addSvgIconLiteral("other-menu-icon", domSanitizer.bypassSecurityTrustHtml(OTHER_MENU_ICON))
   }

  ngOnInit(): void {
    this.subscription=this.dataService.currDrawerState.subscribe(res=>this.drawerState=res)
  }
  handleDrawerClick()
  {
   this.dataService.toggleDrawerState(!this.drawerState) 
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  handleLogout()
  {
 this.route.navigate([""])
  }
  handleSerachString()
  {
    this.dataService.updateSearchString(this.searchString)
  }
}


