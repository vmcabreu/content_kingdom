import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
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
  url: String = "http://contentkingdom.alu6618.arkania.es/api/";
  urltest: String = "http://localhost/backend/";

  constructor(private http: HttpClient) { }

  getUser():Observable<Usuario> {
    return this.http.get<Usuario>(this.url+'controller/usuario/list.php?id=1');
  }
}
