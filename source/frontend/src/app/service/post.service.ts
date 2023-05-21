import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Publicacion } from '../model/publicacion.model';
import { Comentario } from '../model/comentario.model';
import { Etiqueta } from '../model/etiqueta.model';

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

  getPublicaciones(): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(`${this.url}posts/post.php`).pipe(tap(() => {
      this.refresh$.next()
    }))
  }

  getPublicacionesByUsuario(id: number): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(`${this.url}posts/post.php?idUsuario=${id}`).pipe(tap(() => {
      this.refresh$.next()
    }))
  }


  getPublicacionesOrderMeGusta(): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(`${this.url}posts/post.php?listType=likes`).pipe(tap(() => {
      this.refresh$.next()
    }))
  }

  getPublicacionesFromGameId(idJuego: number): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(`${this.url}posts/post.php?idJuego=${idJuego}`).pipe(tap(() => {
      this.refresh$.next()
    }))
  }

  getComentariosFromPostId(id: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.url}posts/comment.php?post=${id}`).pipe(tap(() => {
      this.refresh$.next()
    }))
  }

  getComentariosByUsuario(id: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.url}posts/comment.php?idUsuario=${id}`).pipe(tap(() => {
      this.refresh$.next()
    }))
  }

  getNumComentarios(): Observable<any> {
    return this.http.get<any>(`${this.url}posts/comment.php?listType=number`).pipe(tap(() => {
      this.refresh$.next()
    }))
  }

  deleteComentario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}posts/comment.php?id=${id}`).pipe(tap(() => {
      this.refresh$.next()
    }));
  }

  deletePublicacion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}posts/post.php?id=${id}`).pipe(tap(() => {
      this.refresh$.next()
    }));
  }

  addPublicacion(publicacion: Publicacion): Observable<any> {
    return this.http.post(`${this.url}posts/post.php`, publicacion, { responseType: "text" }).pipe(tap(() => {
      this.refresh$.next()
    }))
  }

  addComentario(comentario: Comentario): Observable<any> {
    return this.http.post(`${this.url}posts/comment.php`, comentario, { responseType: "text" }).pipe(tap(() => {
      this.refresh$.next()
    }))
  }

  getEtiquetas(): Observable<Etiqueta[]> {
    return this.http.get<Etiqueta[]>(`${this.url}tags/list.php`).pipe(tap(() => {
      this.refresh$.next()
    }))
  }

}
