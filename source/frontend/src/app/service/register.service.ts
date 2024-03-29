import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Auth } from '../model/auth.model';
import { Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  url: String = "https://contentkingdom.alu6618.arkania.es/api/controller/";

  private refresh$ = new Subject<void>();

  get getRefresh$(){
    return this.refresh$;
  }

  constructor(private http: HttpClient) { }

  registerUser(usuario: Usuario):Observable<any>{
    return this.http.post(`${this.url}register/register.php`, usuario,{responseType:"text",observe: 'response'}).pipe(tap(()=> {
      this.refresh$.next()
    }))
  }


}
