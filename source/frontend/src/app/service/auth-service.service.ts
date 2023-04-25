import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Token {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private url: String = "http://contentkingdom.alu6618.arkania.es/api/controller/login";

  constructor(private http: HttpClient) { }

  login(nombre: string, passwd: string):Observable<Token> {
    return this.http.post<Token>(`${this.url}/login.php`, { nombre, passwd });
  }




}
