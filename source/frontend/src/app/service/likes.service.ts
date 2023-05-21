import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  url: String = "http://contentkingdom.alu6618.arkania.es/api/controller/";

  private refresh$ = new Subject<void>();

  get getRefresh$(){
    return this.refresh$;
  }

  constructor(private http: HttpClient) { }

  getLikesFromUsuario(id:number){
    return this.http.get(`${this.url}/likes/list.php?id=${id}`)
  }

  getLikesFromPublicacion(id:number){
    return this.http.get(`${this.url}/likes/list.php?post=${id}`)
  }

  setLikes(id: number, post: number) {
    const body = { id_publicacion: post, id_usuarios: id };
    return this.http.post(`${this.url}/likes/list.php`, body);
  }


  unLike(id: number, post: number) {
    const body = { id_publicacion: post, id_usuarios: id };
    return this.http.delete(`${this.url}/likes/list.php?id=${id}&post=${post}`);
  }
}
