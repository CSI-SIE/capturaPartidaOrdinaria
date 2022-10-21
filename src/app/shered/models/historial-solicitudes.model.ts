export interface HistorialSolicitudesModel{
  idPartida: number //"2"

  aplicacionParcial: string //"SI"
  autorizadoJefe: number //"0"
  autorizadoJefeTexto: string //"SIN VALIDAR"
  autorizadoTesoreria: number //"0"
  autorizadoTesoreriaTexto: string //"SIN VALIDAR"

  idpersonAutorizaT: number //"0"
  idpersonAutorizaV: number //"0"

  loginCaptura: string //"lauro.izaguirre"
  loginJefe: string //""
  loginTesoreria: string //""

  //-------------------------------------
  capturadoPor: number //"3924"
  nombreCaptura: string //"LAURO ANTONIO IZAGUIRRE FERRANDO"
  //-------------------------------------

  comentario: string //"Pantalla Mes de Agosto"
  //-------------------------------------
  idEstatus: number //"4"
  idEstatusParcial: number //"2"

  estatusParcial: string //"Autorizado Tesorería (Finalizado)"
  estatusPartida: string //"Autorizada Tesorería"
  //-------------------------------------

  fechaAutorizadoJefe: string //""
  fechaAutorizadoTesoreria: string //""
  fechaCaptura: string //"19/sep/22"

  importeSolicitado: number //"23000.0000"
  importeSolicitadoTexto: number //"23,000.00"

  montoRealEjercido: number //"0.00"
  montoTotalPresupuestado: number //"129000.0000"
  montoTotalPresupuestadoTexto: number //"129,000.00"

  nombreJefe: string //""
  nombreTesoreria: string //""

  proveedor: string //"SIN INFORMACIÓN"


}
