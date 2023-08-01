import { ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { impresion } from './impresion';




@Injectable({
  providedIn: 'root'
})
export class ImpresionService{

  constructor(private http: HttpClient) { }

  obtenerDash(){
    return this.http.get('http://localhost:3000/dash');
  }
  obtenerFechas(){
    return this.http.get('http://localhost:3000/theFecha');
  }
  obtTodo(){
    return this.http.get('http://localhost:3000/imp');
  }
}
