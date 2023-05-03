import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: String = "http://contentkingdom.alu6618.arkania.es/api/controller/";
  urltest: String = "http://localhost/backend/";

  constructor(private http: HttpClient) { }

  loginUser(nombre: string, passwd: string): Observable<any> {
    return this.http.post<any>(`${this.url}/login/login.php`, { nombre, passwd });
  }
}
