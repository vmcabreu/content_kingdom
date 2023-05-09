import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Videojuego } from '../model/videojuego.model';

@Injectable({
  providedIn: 'root'
})
export class VideojuegoService {

  url: String = "http://contentkingdom.alu6618.arkania.es/api/controller/";

  private refresh$ = new Subject<void>();

  get getRefresh$() {
    return this.refresh$;
  }

  constructor(private http: HttpClient) { }

  getAllGames(): Observable<Videojuego[]> {
    return this.http.get<Videojuego[]>(this.url + 'videojuego/list.php');
  }
}
