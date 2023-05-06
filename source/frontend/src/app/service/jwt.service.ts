import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  jwt: JwtHelperService = new JwtHelperService();
  constructor() { }

  decodeToken(token: string){
    return this.jwt.decodeToken(token);
  }

  decodeUsuario(token: string){
    let decoded = this.jwt.decodeToken(token);
    return new Usuario(decoded.id,decoded.nombre,decoded.email);
  }
}
