import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personal } from '../models/personal';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  ruta = `${environment.rutaBackend}/api/personal?numeroPagina=1&tama%C3%B1oPagina=10`;
  constructor( private _httpClient:HttpClient ) { }

  obtenerPersonal(): Observable<any>{
    return this._httpClient.get<Personal>(this.ruta);
  }
}
