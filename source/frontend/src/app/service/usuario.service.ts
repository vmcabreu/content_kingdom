import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url: String = "http://contentkingdom.alu6618.arkania.es/api/";
  urltest: String = "http://localhost/backend/";

  constructor(private http: HttpClient) { }

  getUser():Observable<Usuario> {
    return this.http.get<Usuario>(this.urltest+'usuario.php?id=1');
  }
}
