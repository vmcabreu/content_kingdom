import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Like } from '../model/like.model';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  url: String = "http://contentkingdom.alu6618.arkania.es/api/controller";

  private refresh$ = new Subject<void>();

  get getRefresh$() {
    return this.refresh$;
  }

  constructor(private http: HttpClient) { }

  getLikesList(): Observable<Like[]> {
    return this.http.get<Like[]>(`${this.url}/likes/list.php`)
  }

  getLikesFromUsuario(id: number): Observable<Like[]> {
    return this.http.get<Like[]>(`${this.url}/likes/list.php?id=${id}`)
  }

  getLikesFromPublicacion(id: number): Observable<Like[]> {
    return this.http.get<Like[]>(`${this.url}/likes/list.php?post=${id}`)
  }

  setLikes(id: number, post: number): Observable<any> {
    let like:Like = new Like(post,id);
    return this.http.post<any>(`${this.url}/likes/list.php`, like);
  }


  unLike(id: number, post: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/likes/list.php?id=${id}&post=${post}`);
  }
}
