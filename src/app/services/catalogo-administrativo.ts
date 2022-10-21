import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ServicioBaseAdministrativo } from './servicio-base-administrativo.service';

@Injectable({
  providedIn: 'root'
})


export class CatalogoAdministrativo extends ServicioBaseAdministrativo {
  constructor(
    private _sb: HttpClient
  ) { super(_sb);
  }

  public obtieneSesion(): Observable<any>{
    const parametros = {
      servicio: 'administrativo',
      accion: 'Obtiene_IdIEST',
      tipoRespuesta: 'json'
    };
    return this.consulta(parametros);
  }

  // public recuperaPeriodos(): Observable<any>{
  //   const parametros = {
  //     servicio: 'administrativo',
  //     accion: 'obtenerPeriodos',
  //     tipoRespuesta: 'json'
  //   };
  //   return this.consulta(parametros);
  // }

  // public recargarTabla = new BehaviorSubject<number>(0);
  // public recargarTabla$ = this.recargarTabla.asObservable();

}
