import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Plataforma } from '../model/plataforma.model';

@Injectable({
  providedIn: 'root'
})
export class PlataformaService {

  url: String = "https://contentkingdom.alu6618.arkania.es/api/controller/platform/platform.php";

  private refresh$ = new Subject<void>();

  get getRefresh$() {
    return this.refresh$;
  }

  constructor(private http: HttpClient) { }

  getPlataformaFromUsuarios(id: number): Observable<Plataforma[]> {
    return this.http.get<Plataforma[]>(`${this.url}?id=${id}`)
  }

  getListPlataforma(): Observable<Plataforma[]> {
    return this.http.get<Plataforma[]>(`${this.url}`)
  }

  addPlataforma(plataforma: Plataforma): Observable<any> {
    return this.http.post(`${this.url}`, plataforma,{responseType: "text",observe: 'response'})
  }

  addListaPlataforma(plataformas: Plataforma[]): Observable<any> {
    return this.http.post<any>(`${this.url}?listType=list`, plataformas)
  }

  deletePlataforma(id: number, friend: number): Observable<any> {
    return this.http.delete<any>(`${this.url}?id=${id}`)
  }
}
