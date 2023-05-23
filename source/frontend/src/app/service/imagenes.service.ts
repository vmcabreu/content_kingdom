import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {
  url:string = "gs://contentkingdom-46fb2.appspot.com";

  private refresh$ = new Subject<void>();
  constructor(private http: HttpClient) { }

  getProfilePic(id:number):Observable<File>{
    return this.http.get<File>(`${this.url}/usuario/${id}`)
  }

  getPostPic(id:number):Observable<File>{
    return this.http.get<File>(`${this.url}/publicacion/${id}`)
  }

}
