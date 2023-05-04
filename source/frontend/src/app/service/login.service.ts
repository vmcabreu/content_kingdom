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

  loginUser(nombre: string, passwd: string) {
    return this.http.post(`${this.url}/login/login.php`, { nombre, passwd });
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.url}/login/loginv2.php`, { username, password }).pipe(
      map(data => {
        // Almacena el token en localStorage si la autenticación ha sido exitosa
        localStorage.setItem('token', data.token);
        return data.token;
      })
    );
  }
}
