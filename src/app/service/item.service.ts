import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  ruta = `${environment.rutaBackend}/api/item`;
  constructor( private _httpClient:HttpClient ) { }

  obtenerItem(): Observable<any>{
    const getRuta = this.ruta + "?numeroPagina=1&tama%C3%B1oPagina=10&pag=false";
    return this._httpClient.get<Item>(getRuta);
  }

  guardarItem(item: Item): Observable<any> {
    return this._httpClient.post<any>(this.ruta, item);
  }

  actualizarItem(item: Item): Observable<any> {
    return this._httpClient.put<any>(this.ruta,item);
  }

  eliminarItem(id:number): Observable<any> {
    return this._httpClient.delete(this.ruta+`/${id}`);
  }
}
