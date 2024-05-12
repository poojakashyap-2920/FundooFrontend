import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
// import { SignupComponent } from './components/signup/signup.component';
import { NotesComponent } from './components/notes/notes.component';
import { NotesLeftsideComponent } from './components/notes-leftside/notes-leftside.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ArchiveContainerComponent } from './components/archive-container/archive-container.component';
import { CreateNoteComponent } from './components/create-note/create-note.component';
import { NotesContainerComponent } from './components/notes-container/notes-container.component';
import { TrashContainerComponent } from './components/trash-container/trash-container.component';
// import { TrashContainerComponent } from './components/trash-container/trash-container.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  // {
  //   path:'signup',
  //   component:SignupComponent
  // },
  {
    path:'dashboard',
    component:DashboardComponent,children:[
      {
        path:'notes',
        component:NotesContainerComponent

      },
      {
        path:'createnote',
        component:CreateNoteComponent
      },
      {
        path:'archive',
        component:ArchiveContainerComponent
      },
      {
        path:'trash',
        component:TrashContainerComponent
      },
      {
        path:'delete',
        component:TrashContainerComponent

      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
