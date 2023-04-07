import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url: String = "contentkingdom.alu6618.arkania.es";
  urltest: String = "http://localhost:4200";

  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get(this.url+'/api/usuario.php?id=1');
  }
}