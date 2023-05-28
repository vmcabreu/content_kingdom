import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from '../model/usuario.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  jwt: JwtHelperService = new JwtHelperService();

  private refresh$ = new Subject<void>();

  get getRefresh$(){
    return this.refresh$;
  }
  constructor(private router:Router) { }

  decodeToken(token: string){
    return this.jwt.decodeToken(token);
  }

  decodeUsuario(token: string){
    if (token) {
      let decoded = this.jwt.decodeToken(token);
      return new Usuario(decoded.data.id,decoded.data.nombre,"",decoded.data.email);
    }
    return new Usuario();
  }

  checkToken() {
    let token = localStorage.getItem('token')
    if (token !== "" && token !== undefined) {
      return this.decodeUsuario(token);
    }else{
      if (this.router.url!="/" ) {
        this.router.navigateByUrl("/login");
      }
      return null
    }
  }
}
