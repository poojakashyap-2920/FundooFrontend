import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { title } from 'process';
import { Observable } from 'rxjs';
import { NoteObj } from 'src/assets/type';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseUrl : string = "https://localhost:7233/api"

  private authHeader = new HttpHeaders({
    // 'Accept': "application/json",
    Authorization: `Bearer ${localStorage.getItem('authToken')}`
  })

  constructor(private http: HttpClient) { }

  loginApi(email:string ,password:string):Observable<any>
{
return this.http.get(`https://localhost:7231/api/User/Login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,{})
}

signupApi(body: object):Observable<any>
{
  return this.http.post("https://localhost:7231/api/User/SignUp",body)
}


getAllNotesApi(): Observable<any> {
  return this.http.get("https://localhost:7231/api/Note/GetAllNotes", {headers: this.authHeader})
}


  createNoteApi(data:any):Observable<any>{
    return this.http.post("https://localhost:7231/api/Note/CreateNote",data,{headers:this.authHeader})
  }

  ArchiveApi(id:number = 0):Observable<any>{
    return this.http.patch(`https://localhost:7231/api/Note/ArchiveNote/${id}`,{},{headers:this.authHeader})
  }

  TrashNoteApi(id:number = 0):Observable<any>{
    return this.http.patch(`https://localhost:7231/api/Note/TrashNote/${id}`,{},{headers:this.authHeader})
  }
  

  DeleteNoteApi(id:number = 0):Observable<any>{
    return this.http.patch(`https://localhost:7231/api/Note/DeleteNote/${id}`,{headers:this.authHeader})
  }

  // UpdateColor(id: number, color: string): Observable<any> {
  //   return this.http.patch(`https://localhost:7231/api/Note/UpdateColor/${id}${color}`,{}, { headers: this.authHeader });
  // }

  UpdateColor(id: number, color: string): Observable<any> {
    return this.http.patch(`https://localhost:7231/api/Note/UpdateColor/${id}?color=${encodeURIComponent(color)}`, {}, { headers: this.authHeader });
    
  
}

}