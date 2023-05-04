import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Usuario } from '../model/usuario.model';
import { Auth } from '../model/auth.model';

@Injectable({
  providedIn: 'root'
})


export class LoginService {

  url: String = "http://contentkingdom.alu6618.arkania.es/api/controller/";
  urltest: String = "http://localhost/backend/";

  constructor(private http: HttpClient) { }

  loginPostUser(nombre: string, passwd: string){
    return this.http.post(`${this.url}/login/loginv2.php`, { nombre, passwd });
  }
  loginGetUser(username: string, passwd: string): Observable<Auth>{
    const params = new HttpParams()
    .set('username', username)
    .set('passwd', passwd);
    return this.http.get<Auth>(`${this.url}/login/loginv2.php`, { params:params });
  }
}
