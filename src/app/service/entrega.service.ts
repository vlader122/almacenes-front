import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entrega } from '../models/entrega';

@Injectable({
  providedIn: 'root'
})
export class EntregaService {
  ruta = `${environment.rutaBackend}/api/entrega`;
  constructor( private _httpClient:HttpClient ) { }

  obtenerEntrega(): Observable<any>{
    const getRuta = this.ruta + "?numeroPagina=1&tama%C3%B1oPagina=10&pag=false";
    return this._httpClient.get<Entrega>(getRuta);
  }

  guardarEntrega(entrega: Entrega): Observable<any> {
    return this._httpClient.post<any>(this.ruta, entrega);
  }

  actualizarEntrega(entrega: Entrega): Observable<any> {
    return this._httpClient.put<any>(this.ruta,entrega);
  }

  eliminarEntrega(id:number): Observable<any> {
    return this._httpClient.delete(this.ruta+`/${id}`);
  }
}
