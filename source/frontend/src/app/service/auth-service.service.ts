import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private url: String = "http://contentkingdom.alu6618.arkania.es/api/controller/login";

  constructor(private http: HttpClient) { }

  login(nombre: string, passwd: string):Observable<Usuario> {
    return this.http.post<Usuario>(`${this.url}/login.php`, { nombre, passwd},{responseType:"json"});
  }

}
