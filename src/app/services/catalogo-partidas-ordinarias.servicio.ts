import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ServicioBasePartidasOrdinarias } from './servicio-base-partidas-ordinarias.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogoServicePartidasOrdinarias extends ServicioBasePartidasOrdinarias{

  constructor(
    private _sb: HttpClient
    ) {
    super(_sb);
  }

  public recargarTabla = new BehaviorSubject<number>(0);
  public recargarTabla$ = this.recargarTabla.asObservable();


  //Ya no se ocupa porque se agregó a otra api
  // public obtenerSolicitudByidmovimiento(_idmovimiento:number): Observable<any>{
  //   const parametros = {
  //     servicio: 'reportes',
  //     accion2: 1,
  //     accion: 'CAT_PartidasOrdinarias_ConsultaPoridMovimiento',
  //     idmovimiento: _idmovimiento,
  //     tipoRespuesta: 'json',

  //   };
  //   return this.consulta(parametros);
  // }



}
