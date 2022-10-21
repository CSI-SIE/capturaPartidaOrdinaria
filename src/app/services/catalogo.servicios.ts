import { NumberSymbol } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ServicioBase } from './servicio-base.service';


@Injectable({
  providedIn: 'root'
})
export class CatalogoService extends ServicioBase{

  constructor(
    private _sb: HttpClient
    ) {
    super(_sb);
  }

  public recargarTabla = new BehaviorSubject<number>(0);
  public recargarTabla$ = this.recargarTabla.asObservable();

  public obtenerSolicitudByidmovimiento(_idmovimiento:number): Observable<any>{
    const parametros = {
      servicio: 'catalogo',
      accion2: 1,
      accion: 'CAT_PartidasOrdinarias_ConsultaPoridMovimiento',
      idMovimiento: _idmovimiento,
      tipoRespuesta: 'json',

    };
    return this.consulta(parametros);
  }

  public CatalogoDepartamentos(_idPeriodo:number): Observable<any>{
    const parametros = {
      servicio: 'catalogo',
      accion: 'CAT_PartidasOrdinarias_Catalogo_Departamentos_porPeriodo',
      idPeriodo: _idPeriodo,
      tipoRespuesta: 'json'
    };
    return this.consulta(parametros);
  }

  public ConsultaTodasPartidasOrdinarias(_idPeriodo:number, _accionConsulta:number): Observable<any>{
    const parametros = {
      servicio: 'catalogo',
      accion: 'CAT_PartidasOrdinarias_ListadoAutorizado_Todos_Departamentos',
      idPeriodo: _idPeriodo,
      idDepartamento: 0,
      accionConsulta: _accionConsulta,
      tipoRespuesta: 'json'
      //internamente por API le manda @accion = 1
    };
    return this.consulta(parametros);
  }

  public ConsultaPartidasOrdinariasPorDepartamento(_idPeriodo:number, _idDepartamento:number): Observable<any>{
    const parametros = {
      servicio: 'catalogo',
      accion: 'CAT_PartidasOrdinarias_ListadoAutorizado_Departamentos_Individual',
      idPeriodo: _idPeriodo,
      idDepartamento: _idDepartamento,
      tipoRespuesta: 'json'
      //internamente por API le manda @accion = 2
    };
    return this.consulta(parametros);
  }



  //** Guardar */
  public guardarSolicitud(
    _idMovimiento:number,
    _proveedor:string,
    _montoSolicitado:number,
    _montoTotalPresupuestado:number,
    _SaldoaFavor:number,
    _aplicacionParcial: number,
    _comentarios:string,
    _tienePartidaCapturada:number
    ): Observable<any>{
    const parametros = {
      servicio: 'catalogo',
      accion: 'CAT_PartidasOrdinarias_Alta',
      idMovimiento: _idMovimiento,
      proveedor: _proveedor,
      montoSolicitado: _montoSolicitado,
      montoTotalPresupuestado: _montoTotalPresupuestado,
      SaldoaFavor: _SaldoaFavor,
      aplicacionParcial: _aplicacionParcial,
      comentarioGeneral:_comentarios,
      tienePartidaCapturada: _tienePartidaCapturada,
      tipoRespuesta: 'json',

    };
    return this.consulta(parametros);
  }

  public listarPartidasOrdinariasDetalle(_idMovimiento:number): Observable<any>{
    const parametros = {
      servicio: 'catalogo',
      accion: 'CAT_PartidasOrdinarias_ListadoDetalleMovimiento',
      idMovimiento: _idMovimiento,
      tipoRespuesta: 'json',
    };
    return this.consulta(parametros);

  }

  //---Permisos------------------------------------------------------------------------
  //Revisa que permisos tiene asignados y que tiene permitido visualizar.
  //Puede tener permisos desde el presupuesto
  // o podemos darle permisos directamente.
  //IEST.dbo.CAT_PartidasOrdinarias_PermisosSistema
  //Si no esta liberado
          // set @mensaje = 'No puede capturar partidas Ordinarias ya que el presupuesto no ha sido liberado.'
          // set @error = 1
          // set @accionConsulta = 0 -- No hay accion
      //else
          // set @mensaje = 'Sistema se encuentra cerrado, pero tiene permiso de preliberación'
          // set @error = 0 -- No hay error
          // set @accionConsulta = 3 -- Regresamos la accion que va a poder hacer en la consulta

  //Si ya esta liberado el presupuesto
  //-- Aqui la persona no tiene permisos para capturar en algun departamento, pero tenemos nuestra propia tabla para sabe si le dieron permiso por algun movimiento...
        //if exists(Select * from CAT_B_PartidaOrdinaria_PermisosPorMovimiento where idPersonAutorizado = @idpersonConsulta and idperiodo = @idPeriodoActualPartidasOrd and borrado = 0)
          // set @mensaje = 'El sistema esta abierto, pero con permisos concedidos por movimiento'
          // set @error = 0 -- No hay error
          // set @accionConsulta = 4
        //else
          // set @mensaje = 'No tienes permisos asignados en el presupuesto sobre ningun departamento.'
          // set @error = 2
          // set @accionConsulta = 0
    //else
        //if @rol not in (1,3) -- Solo vemos si tiene rol de capturista o administrador
          // set @mensaje = 'Usted no tiene un rol permitido para consultar información de las partidas.'
          // set @error = 3
          // set @accionConsulta = 0
        //else
          // set @mensaje = 'Usuario con permiso desde el presupuesto.'
          // set @error = 4
          // set @accionConsulta = 1

  public PermisosSistema(_idpersonConsulta:number): Observable<any>{
    const parametros = {
      servicio: 'catalogo',
      accion: 'CAT_PartidasOrdinarias_PermisosSistema',
      idpersonConsulta: _idpersonConsulta,
      tipoRespuesta: 'json'
    };
    return this.consulta(parametros);
  }

  //Consulta si tiene permitido solicitar la partida
  //consulta si tiene saldo a favor para poder capturar
  //se basa en si es partida parcial o normal.
  public ConsultaPermisoAlta(_idMovimiento:number): Observable<any>{
    const parametros = {
      servicio: 'catalogo',
      accion: 'CAT_PartidasOrdinarias_consultaPermisoAlta',
      idMovimiento: _idMovimiento,
      tipoRespuesta: 'json'
    };
    return this.consulta(parametros);
  }
  //**---Permisos-----------------------------------------------------------------------

  // ** aprobar / rechazar --------
  //Esta pendiente de que lo haga Lauro el Store y Nancy haga la api
  public aprobarJefe(_id: number, _idPersonCaptura:number): Observable<any>{
    const parametros = {
      servicio: 'catalogo',
      accion2: 0,
      accion: 'CAT_PartidasOrdinarias_aprobarJEFE',
      idMovimiento: _id,
      aceptoRehazo: 1, //significa que es rechazado
      idPersonCaptura: _idPersonCaptura,
      tipoRespuesta: 'json',

    };
    return this.consulta(parametros);
  }

  //Esta pendiente de que lo haga Lauro el Store y Nancy haga la api
  public rechazarTesoreria(_id: number, _motivo:string, _idPersonCaptura:number): Observable<any>{
    const parametros = {
      servicio: 'catalogo',
      accion2: 0,
      accion: 'CAT_PartidasOrdinarias_rechazarTesoreria',
      idMovimiento: _id,
      aceptoRehazo: 2, //significa que es rechazado
      idPersonCaptura: _idPersonCaptura,
      comentario: _motivo,
      tipoRespuesta: 'json',

    };
    return this.consulta(parametros);
  }

  public aprobarTesoreria(_id: number, _idPersonCaptura:number): Observable<any>{
    const parametros = {
      servicio: 'catalogo',
      accion2: 0,
      accion: 'CAT_PartidasOrdinarias_aprobarTesoreria',
      idMovimiento: _id,
      aceptoRehazo: 1, //significa que es rechazado
      idPersonCaptura: _idPersonCaptura,
      tipoRespuesta: 'json',

    };
    return this.consulta(parametros);
  }

  //Esta pendiente de que lo haga Lauro el Store y Nancy haga la api
  public rechazarJefe(_id: number, _motivo:string, _idPersonCaptura:number): Observable<any>{
    const parametros = {
      servicio: 'catalogo',
      accion2: 0,
      accion: 'CAT_PartidasOrdinarias_rechazarJEFE',
      idMovimiento: _id,
      aceptoRehazo: 2, //significa que es rechazado
      idPersonCaptura: _idPersonCaptura,
      comentario: _motivo,
      tipoRespuesta: 'json',

    };
    return this.consulta(parametros);
  }

  // ** aprobar / rechazar --------
}
