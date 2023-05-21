import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { Usuario } from '../model/usuario.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer '
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url: String = "https://contentkingdom.alu6618.arkania.es/api/controller/";
  urltest: String = "http://localhost/backend/";

  private refresh$ = new Subject<void>();

  get getRefresh$(){
    return this.refresh$;
  }

  constructor(private http: HttpClient) { }

  getUser(id:number):Observable<Usuario> {
    return this.http.get<Usuario>(this.url+'usuario/list.php?id='+id);
  }

  getUserByUsername(username:string):Observable<Usuario> {
    return this.http.get<Usuario>(this.url+'usuario/list.php?user='+username);
  }


  getUserList():Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url+'usuario/list.php');
  }

  getNewUserList():Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url+'usuario/list.php?list=new');
  }

  editUser(user:Usuario):Observable<any>{
    return this.http.put(this.url+'usuario/update.php',user,{responseType:"text",observe:"response"})
  }

  deleteUser(id:number):Observable<any>{
    return this.http.delete(this.url+'usuario/delete.php?id='+id,{responseType:"text",observe:"response"})
  }
}
