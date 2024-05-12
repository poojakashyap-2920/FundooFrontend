import { Injectable } from '@angular/core';
import { HttpService } from '../httpService/http.service';
import { Observable } from 'rxjs';
import { NoteObj } from 'src/assets/type';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private httpService: HttpService) { }



  getAllNotesCall():Observable<any> {
    return this.httpService.getAllNotesApi()
  }

  createNoteApiCall(data:any):Observable<any>
  {
    return this.httpService.createNoteApi(data);
  }

  archiveApiCall(id:number): Observable<any>
  {
    console.log(id);
    
    return this.httpService.ArchiveApi(id);
  }

  TrashNoteApiCall(id:number): Observable<any>
  {
    console.log(id);
    
    return this.httpService.TrashNoteApi(id);
  }
  DeleteNoteApiCall(id:number): Observable<any>
  {
    console.log(id);
    return this.httpService.DeleteNoteApi(id)
  }

  UpdateColorApiCall(id:number,color:string): Observable<any>
  {
    console.log(id,color);
    return this.httpService.UpdateColor(id,color);
  }

}
