import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Publicacion } from '../model/publicacion.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  url: String = "http://contentkingdom.alu6618.arkania.es/api/controller/";

  private refresh$ = new Subject<void>();

  get getRefresh$() {
    return this.refresh$;
  }

  constructor(private http: HttpClient) { }

  addPublicacion(publicacion: Publicacion): Observable<any> {
    return this.http.post(`${this.url}posts/post.php`, publicacion, { responseType: "text" }).pipe(tap(() => {
      this.refresh$.next()
    }))
  }

  getPublicaciones(): Observable<Publicacion[]>{
    return this.http.get<Publicacion[]>(`${this.url}posts/post.php`)
  }

  getPublicacionesOrderMeGusta(): Observable<Publicacion[]>{
    return this.http.get<Publicacion[]>(`${this.url}posts/post.php?listType=likes`)
  }
}
