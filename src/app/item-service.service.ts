import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {
  url = 'http://localhost:2000/';

  constructor(private http: HttpClient) { }

  getItem(): Observable <any>{
    return this.http.get(`${this.url}items`)
  }
  addItem(item): Observable<any>{
    return this.http.get(`${this.url}addItem/${item.itemName}/${item.numberSale}`);
  }
}
