import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  url: String = "http://contentkingdom.alu6618.arkania.es/api/controller/";

  private refresh$ = new Subject<void>();

  get getRefresh$(){
    return this.refresh$;
  }

  constructor(private http: HttpClient) { }
}
