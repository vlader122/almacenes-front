import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  ruta = `${environment.rutaBackend}/api/categoria`;
  constructor( private _httpClient:HttpClient ) { }

  obtenerCategoria(): Observable<any>{
    const getRuta = this.ruta + "?numeroPagina=1&tama%C3%B1oPagina=10&pag=false";
    return this._httpClient.get<Categoria>(getRuta);
  }

  guardarCategoria(categoria: Categoria): Observable<any> {
    return this._httpClient.post<any>(this.ruta, categoria);
  }

  actualizarCategoria(categoria: Categoria): Observable<any> {
    return this._httpClient.put<any>(this.ruta,categoria);
  }

  eliminarCategoria(id:number): Observable<any> {
    return this._httpClient.delete(this.ruta+`/${id}`);
  }
}
