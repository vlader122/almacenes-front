import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personal } from '../models/personal';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  ruta = `${environment.rutaBackend}/api/personal`;
  constructor( private _httpClient:HttpClient ) { }

  obtenerPersonal(): Observable<any>{
    const getRuta = this.ruta + "?numeroPagina=1&tama%C3%B1oPagina=10&pag=false";
    return this._httpClient.get<Personal>(getRuta);
  }

  guardarPersonal(personal: Personal): Observable<any> {
    return this._httpClient.post<any>(this.ruta, personal);
  }

  actualizarPersonal(personal: Personal): Observable<any> {
    return this._httpClient.put<any>(this.ruta,personal);
  }

  eliminarPersonal(id:number): Observable<any> {
    return this._httpClient.delete(this.ruta+`/${id}`);
  }
}
