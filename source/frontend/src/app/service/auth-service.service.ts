import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private url: String = "http://contentkingdom.alu6618.arkania.es/api/controller/login";

  constructor(private http: HttpClient) { }

  login(nombre: string, passwd: string):Observable<any> {
    return this.http.post<any>(`${this.url}/login.php`, { nombre, passwd });
  }




}
