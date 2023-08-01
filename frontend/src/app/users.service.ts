import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { modeloUsuario } from './modeloUsuario';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = "http://localhost:3000/registro";
  constructor(private http:HttpClient) { }
  
  crear(datos: any): Observable<any>{
    console.log(datos);
    return this.http.post<any>(this.url,datos);
  }
  obtenerDatos(){
    return this.http.get<modeloUsuario[]>('http://localhost:3000/obt');
    }
  
  editarUsuario(correo:string, nuevos:any):Observable<any>{
      return this.http.put<any>('http://localhost:3000/actualizar',nuevos);

    }
    eliminarUsuario(correo:string):Observable<any>{
      const data={body:{correo}};
      return this.http.delete<any>('http://localhost:3000/del',data);
    }
}
