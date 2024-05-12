import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { NotesComponent } from './components/notes/notes.component';
import { NotesLeftsideComponent } from './components/notes-leftside/notes-leftside.component';
import { CreateNoteComponent } from './components/create-note/create-note.component';
import { NoteCardComponent } from './components/notecard/notecard.component';
import { NotesContainerComponent } from './components/notes-container/notes-container.component';
import { ArchiveContainerComponent } from './components/archive-container/archive-container.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav'; // Import MatSidenavModule for mat-drawer-content
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { TrashContainerComponent } from './components/trash-container/trash-container.component';

import { Pipe, PipeTransform } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { SearchPipe } from './components/PipeService/pipe.pipe';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotesComponent,
    NotesLeftsideComponent,
    CreateNoteComponent,
    NoteCardComponent,
    NotesContainerComponent,
    ArchiveContainerComponent,
    DashboardComponent,
    TrashContainerComponent,
    SearchPipe
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    MatButtonModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSidenavModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    HttpClientModule,
    MatMenuModule
  
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
