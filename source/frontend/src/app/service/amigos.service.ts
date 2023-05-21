import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AmigosUsuarios } from '../model/amigos.model';

@Injectable({
  providedIn: 'root'
})
export class AmigosService {

  url: String = "http://contentkingdom.alu6618.arkania.es/api/controller/friends/";

  private refresh$ = new Subject<void>();

  get getRefresh$() {
    return this.refresh$;
  }

  constructor(private http: HttpClient) { }

  getAmigosFromUsuario(id: number): Observable<AmigosUsuarios[]> {
    return this.http.get<AmigosUsuarios[]>(`${this.url}list.php?id=${id}`)
  }

  getAmigosFromAmigo(id: number): Observable<AmigosUsuarios[]> {
    return this.http.get<AmigosUsuarios[]>(`${this.url}list.php?friend=${id}`)
  }

  getAmigosList(): Observable<AmigosUsuarios[]> {
    return this.http.get<AmigosUsuarios[]>(`${this.url}list.php`)
  }

  addAmigo(amigoUsuario: AmigosUsuarios): Observable<any> {
    return this.http.post<any>(`${this.url}list.php`, amigoUsuario)
  }

  deleteAmigo(id: number, friend: number): Observable<any> {
    return this.http.delete<any>(`${this.url}list.php?id=${id}&friend=${friend}`)
  }
}
