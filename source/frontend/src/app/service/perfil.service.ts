import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Perfil } from '../model/perfil.mode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  url: String = "http://contentkingdom.alu6618.arkania.es/api/controller/";

  constructor(private http: HttpClient) { }

  getProfilebyUserID(id_usuario: number): Observable<Perfil>{
    return this.http.get<Perfil>(`${this.url}perfil/perfil.php?id=${id_usuario}`);
  }
}
