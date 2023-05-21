import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EtiquetasPublicacion } from '../model/etiqueta-publicacion.model';

@Injectable({
  providedIn: 'root'
})
export class EtiquetaPublicacionService {


  url: String = "http://contentkingdom.alu6618.arkania.es/api/controller/tags/post.php";

  private refresh$ = new Subject<void>();

  get getRefresh$() {
    return this.refresh$;
  }

  constructor(private http: HttpClient) { }

  getTagFromPost(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}?id=${id}`)
  }

  getTagFromTag(id: number): Observable<EtiquetasPublicacion[]> {
    return this.http.get<EtiquetasPublicacion[]>(`${this.url}?tag=${id}`)
  }

  getListTagPost(): Observable<EtiquetasPublicacion[]> {
    return this.http.get<EtiquetasPublicacion[]>(`${this.url}`)
  }

  addTagPost(tagPost: EtiquetasPublicacion): Observable<any> {
    return this.http.post<any>(`${this.url}`, tagPost)
  }

  addTagPostList(tagPost: EtiquetasPublicacion[]): Observable<any> {
    return this.http.post<any>(`${this.url}?listType=list`, tagPost)
  }
}
