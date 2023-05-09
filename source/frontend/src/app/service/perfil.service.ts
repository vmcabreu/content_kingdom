import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Perfil } from '../model/perfil.mode';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  url: String = "http://contentkingdom.alu6618.arkania.es/api/controller/";

  private refresh$ = new Subject<void>();

  get getRefresh$(){
    return this.refresh$;
  }

  constructor(private http: HttpClient) { }

  getProfilebyUserID(id_usuario: number): Observable<Perfil>{
    return this.http.get<Perfil>(`${this.url}perfil/perfil.php?id=${id_usuario}`);
  }

  generateEmptyProfile(id_usuario: number) {
    const params = new HttpParams()
    .set('id', id_usuario)
    return this.http.post(`${this.url}perfil/perfil.php`,{params:params})
  }
}
