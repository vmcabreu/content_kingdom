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
  url: String = "http://contentkingdom.alu6618.arkania.es/api/controller/";
  urltest: String = "http://localhost/backend/";

  private refresh$ = new Subject<void>();

  get getRefresh$(){
    return this.refresh$;
  }

  constructor(private http: HttpClient) { }

  getUser():Observable<Usuario> {
    return this.http.get<Usuario>(this.url+'usuario/list.php?id=1');
  }


  getUserList():Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url+'usuario/list.php');
  }

  getNewUserList():Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url+'usuario/list.php?list=new');
  }
}
