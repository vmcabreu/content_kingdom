import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private url: String = "http://contentkingdom.alu6618.arkania.es/api/controller";

  constructor(private http: HttpClient) { }

  login(nombre: string, passwd: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.url}/login/login.php`, { nombre, passwd }, { responseType: "json" });
  }

  register(nombre: string, passwd: string, email: string) {
    return this.http.post<Usuario>(`${this.url}/usuario/create.php`, { nombre, passwd, email }, { responseType: "json" });
  }

}
