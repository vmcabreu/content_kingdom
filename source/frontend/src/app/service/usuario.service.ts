import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url: String = "contentkingdom.alu6618.arkania.es";
  urltest: String = "http://localhost:4200";

  constructor(private http: HttpClient) { }

  getUser():Observable<Usuario> {
    return this.http.get<Usuario>(this.url+'/api/usuario.php?id=1');
  }
}
