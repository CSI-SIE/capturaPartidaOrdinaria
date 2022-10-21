import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicioBasePeriodos } from './servicio-base-periodos';

@Injectable({
  providedIn: 'root'
})
export class CatalogoPeriodosService extends ServicioBasePeriodos{

  constructor(
    private _sb: HttpClient
    ) {
    super(_sb);
  }

  public CatalogoPeriodos(): Observable<any>{
    const parametros = {
      servicio: 'recursosHumanos',
      accion: 'ESC_HorariosClase_Catalogos_Periodos',

      tipoRespuesta: 'json'

    };
    return this.consulta(parametros);
  }



}
