import { _isNumberValue } from '@angular/cdk/coercion';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators, UntypedFormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router'
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { partidaOrdinaria } from '../shered/models/partida-ordinaria.models';
import { CatalogoServicePartidasOrdinarias } from '../services/catalogo-partidas-ordinarias.servicio';
import { DistribucionMesesComponent } from '../distribucion-meses/distribucion-meses.component';
import { MatDialog } from '@angular/material/dialog';
import { ServicioBase } from '../services/servicio-base.service';
import { CatalogoService } from '../services/catalogo.servicios';

@Component({
  selector: 'app-nueva',
  templateUrl: './nueva.component.html',
  styleUrls: ['./nueva.component.scss']
})
export class NuevaComponent implements OnInit {
  @ViewChild('Archivo',{static:false})
  Archivo:ElementRef;

  @ViewChild('radioButtons',{static:false})
  radioButtons:ElementRef;

  idMovimientoGlobal:number;
  public partidaOrdinariaModel: partidaOrdinaria[];
  resultadosPartidasOrdinarias: partidaOrdinaria[] = [];
  //Meses----
  @Input()
  checked: Boolean;

  @Output()
  change: EventEmitter<MatSlideToggleChange>

  mesDefault = 0;
  mesesActivado = false;
  costosActivado = false;
  meses:any[]= [
    {
      idMes: 1,
      nombreMes: 'Julio'
    },
    {
      idMes: 2,
      nombreMes: 'Agosto'
    },
    {
      idMes: 3,
      nombreMes: 'Septiembre'
    },
    {
      idMes: 4,
      nombreMes: 'Octubre'
    },
    {
      idMes: 5,
      nombreMes: 'Noviembre'
    },
    {
      idMes: 6,
      nombreMes: 'Diciembre'
    },

  ]
  //---------

  //Datos de la solicitud-----
  public Departamento:string;
  public Descripcion:string;
  public Justificacion:string;
  public Total:number;
  public EsPartidaParcial;
  public SaldoaFavor:number;
  public TienePartidaCapturada:number;
  //-------------------------

  public GuardadoCorrectamente:boolean = false;
  public activarSeleccionaArchivo: boolean = false;
  //Subir archivos--------------------
  NombreArchivo = '';

  @Input()
  requiredFileType:string;
  uploadProgress:number;
  uploadSub: Subscription;
  //-----------------------------------
  nuevaEditar:string;
  public tipo:number;
  idRegistroGlobal:number;

  private suscripciones: Subscription[];
  public formNuevaSolicitud: UntypedFormGroup;

  public formArchivos: UntypedFormGroup;

  public partidaExtraordinariaSeleccionada: string = 'Si';
  public tipoPartidaExtraordinaria:string[]=['No', 'Si'];

  //Calcular costos de presupuestos----
  public MontoSolicitado:number;
  public CostoPresupuestado:number;
  public Diferencia:number;
  //-----------------------------------

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  idPerson = 0;

  constructor(
  //-----------------------------------------private _validaRechazaService: ValidaRechazaService,
  //-----------------------------------------private _archivosService: UploadDownloadService,
  private _fb: UntypedFormBuilder,
  public route: ActivatedRoute,
  private _catalogoServicePartidasOrdinarias: CatalogoServicePartidasOrdinarias,
  private _catalogoServicioBase: CatalogoService,
  //-----------------------------------------private _subirArchivosService: ServicioArchivo,
  private router: Router,
  private http: HttpClient,
  private _snackBar: MatSnackBar,
  public dialog: MatDialog,
  ) {

  this.suscripciones = [];
  //-----------------------------------------this.modeloArchivo =[];

    //formGroups Guardar----------------------------------------------------
    this.formNuevaSolicitud = this._fb.group({

      Proveedor: [
        '',
        [
          Validators.required
        ]
      ],
      MontoSolicitado: [
        null,
        [
          Validators.required, Validators.min(.01)
        ]
      ],
      Comentarios: [
        '',
        [

        ]
      ],
      detalleConceptos: this._fb.array([
        this._fb.group({
          IdRegistro: [0],
          ConceptoPorDetalle: [null],
          Monto: []
        })
      ])
    });

    //formGroups Archivos--------------------------------------
    this.formArchivos= this._fb.group({
      fileCotizacion:[
        null,
        []
      ],
    });
     //---------------------------------------------------------------

    const observadorValidadorFormularioCompraGeneral$ =
    this.formNuevaSolicitud.valueChanges.subscribe(
      (datos) => {
        this.dcfCompraGeneral(datos);
      }
    );

    this.suscripciones.push(observadorValidadorFormularioCompraGeneral$);

    this.dcfCompraGeneral();
  }

  get detalles() {
    return this.formNuevaSolicitud.get('detalleConceptos') as UntypedFormArray;
  }

  get vermeses() {
    return this.formNuevaSolicitud.get('VerMeses') as UntypedFormArray;
  }

  addDetalleConcepto() {
    this.detalles.push(
      this._fb.group({
        IdRegistro: [0],
        ConceptoPorDetalle: [null],
        Monto: []
      })
    );
  }

  addDetalleConceptoConDatos(conceptos:any[]){
    if(conceptos.length>0)
    {
      this.detalles.clear();
      conceptos.forEach(element => {
        if(element.borrado==0)//Se van a visualizar solo los que NO estan borrados.

        this.detalles.push(
          this._fb.group({
            IdRegistro: [element.idRegistro],
            ConceptoPorDetalle: [element.concepto],
            Monto: [parseFloat(element.monto.toString())]
          })
        )
      });
    }
  }

  deleteDetalleConcepto(i){
    if(this.detalles.length>1){
    this.detalles.removeAt(i)
    }
    this.onKeyUp();
  }

  agregarPartidaExtraordinaria(){
    //agregar
    this.detalles.clear();
    this.addDetalleConcepto();
    this.formNuevaSolicitud.reset(
      {     }
    );
  }

  clickCambiaronTipoSeleccion(event:any){
    /*console.log(this.detalles.controls);
    this.detalles.controls['ConceptoPorDetalle'].setValidators([Validators.required]);
    this.detalles.updateValueAndValidity();
    console.log(this.detalles.controls);
    */

    console.log(event.value);
    if(event.value != 'Compra general'){
      this.detalles.clear();
      this.addDetalleConcepto();
      this.detalles.controls[0].get('ConceptoPorDetalle').setValidators([Validators.required]);
      this.detalles.controls[0].get('Monto').setValidators([Validators.required]);

      this.detalles.controls[0].get('ConceptoPorDetalle').updateValueAndValidity;
      this.detalles.controls[0].get('Monto').updateValueAndValidity;
    }
    else
    {
      //this.detalles.clear();
      /*this.addDetalleConcepto();
      this.detalles.controls[0].get('ConceptoPorDetalle').clearValidators();
      this.detalles.controls[0].get('Monto').clearValidators();

      this.detalles.controls[0].get('ConceptoPorDetalle').updateValueAndValidity;
      this.detalles.controls[0].get('Monto').updateValueAndValidity;
      */
    }
    //console.log(this.detalles);
    //console.log(this.detalles.controls[0].get('ConceptoPorDetalle').setValidators([Validators.required]));

  }

  convertirTipoSeleccionada(){
    switch(this.partidaExtraordinariaSeleccionada){
      case 'Compra general':
        this.tipo = 1;
        break;
      case 'Gastos a comprobar':
        this.tipo = 2;
        break;
      case 'Reembolso':
        this.tipo = 3;
        break;
      case 'Gastos de viajes':
        this.tipo = 4;
        break;
      default:
        this.tipo = 0;
        break;
    }
  }

  convertirTipoSeleccionadaNumToText(_tipo:number){
    switch(_tipo){
      case 1:
        this.partidaExtraordinariaSeleccionada = 'Compra general';
        break;
      case 2:
        this.partidaExtraordinariaSeleccionada = 'Gastos a comprobar';
        break;
      case 3:
        this.partidaExtraordinariaSeleccionada = 'Reembolso';
        break;
      case 4:
        this.partidaExtraordinariaSeleccionada = 'Gastos de viajes';
        break;
      default:
        this.partidaExtraordinariaSeleccionada = '';
        break;
    }
  }

  submitDePrueba(){

    this.GuardadoCorrectamente = true;
    this.formNuevaSolicitud.disable();

  }

      // @montoSolicitado money,
      // @montoTotalPresupuestado money,
      // @SaldoaFavor money,
      // @aplicacionParcial tinyint,
      // @comentarioGeneral varchar(max),
      // @tienePartidaCapturada tinyint

  onSubmit(){

    if(this.idMovimientoGlobal>0){
      const guardar$ = this._catalogoServicioBase.guardarSolicitud(
        this.idMovimientoGlobal,
        this.formNuevaSolicitud.value['Proveedor'],
        this.formNuevaSolicitud.value['MontoSolicitado'],
        this.Total,
        this.SaldoaFavor,
        this.EsPartidaParcial,
        this.formNuevaSolicitud.value['Comentarios'],
        this.TienePartidaCapturada
      ).subscribe(
        {
          next: (data) =>{
            console.log(data);
            if(data[0].hasOwnProperty('error'))
            {
              if(data[0].error == 0)
              {
                this.openSnackBar(data[0].mensaje);//Actualmente el mensaje que viene de la DB es "Se ha guardado correctamente la partida."}
                this.router.navigateByUrl('');
              }
              else
              {
                this.openSnackBar(data[0].mensaje);
              }
            }
          },
          error: (errores) =>{
            console.error(errores);
          }
        }
      );
      this.suscripciones.push(guardar$);
    }

  }

  ngOnInit(): void {
    // this.formNuevaSolicitud.controls['CostoPresupuestado'].disable();
    // this.formNuevaSolicitud.controls['MontoSolicitado'].disable();
    // this.formNuevaSolicitud.controls['Diferencia'].disable();

    this.route.paramMap.pipe(
      map(params => Number(params.get('idmovimiento')))
    ).subscribe(idMovimiento =>{
      if(idMovimiento>0)
      {
        //this.openSnackBar('idMovimiento Seleccionado:  ' + idMovimiento);
        this.idMovimientoGlobal = idMovimiento;

        //De prueba------
         this.consultaPartidasOrdinariasById(idMovimiento);
         //---------------

        // const obtenerSolicitud$ = this._catalogosService.obtenerSolicitudByidmovimiento(this.idMovimientoGlobal).subscribe(
        //   {
        //     next:(data) => {
        //       console.log(data);
        //     },
        //     error:(errores) => {
        //       console.error(errores);
        //     },
        //     complete:() => {

        //     }

        //   }
        // )
        // this.suscripciones.push(obtenerSolicitud$); Rougue, Monk, DH, Mage, Hunter
      }
    });

  }


  ngAfterViewChecked(): void {
    //this.EsPartidaParcial = this.resultadosPartidasOrdinarias[0].esPartidaParcial;

  }

  consultaPartidasOrdinariasById(_idmovimiento:number){
    const consultaPartidasOrdinariasPorDepartamento$ = this._catalogoServicioBase.obtenerSolicitudByidmovimiento(
      _idmovimiento
      ).subscribe(
      {
        next:(data: any) =>{
          this.resultadosPartidasOrdinarias = [];
          this.partidaOrdinariaModel = data[0];
          this.resultadosPartidasOrdinarias = data[0];

          console.log(data[0]);

          //Fijar datos obtenidos--
          this.Departamento = data[0].nombreDepartamento;
          this.Descripcion = data[0].descripcion;
          this.Justificacion = data[0].justificacion;
          this.Total = data[0].total;
          this.EsPartidaParcial = data[0].esPartidaParcial;

          this.SaldoaFavor = data[0].saldoaFavor;
          this.TienePartidaCapturada = data[0].tienePartidaCapturada;
          console.log(data[0].esPartidaParcial);

          // public Departamento:string;
          // public Descripcion:string;
          // public Justificacion:string;
          // public Total:number;
          // public EsPartidaParcial:number = 0;
          // public SaldoaFavor:number;
          // public TienePartidaCapturada:number;

          // let fijarDatos = { //Establesco los datos que vienen desde la DB
          //   CostoPresupuestado: parseFloat(data[0].precio),
          //   MontoSolicitado: parseFloat(data[0].precio),
          //   Diferencia: 0
          // }
          // this.formNuevaSolicitud.patchValue(fijarDatos); //Seteo los datos obtenidos en cada control del formulario.
          //-----------------------
        },
        error:(errores) =>{
          console.error(errores);
        },
        complete:()=>{
        }

      }
    );
      this.suscripciones.push(consultaPartidasOrdinariasPorDepartamento$);
  }

  desbloquearControlesCostos(){
    //this.formNuevaSolicitud.controls['CostoPresupuestado'].enable();
    this.formNuevaSolicitud.controls['MontoSolicitado'].enable();
  }

  bloquearControlesCostos(){
    this.formNuevaSolicitud.controls['CostoPresupuestado'].disable();
    this.formNuevaSolicitud.controls['MontoSolicitado'].disable();
    this.formNuevaSolicitud.controls['Diferencia'].disable();
  }

  onKeyUp() {
    //this.CostoPresupuestado = parseFloat(this.formNuevaSolicitud.value['CostoPresupuestado']);
    this.CostoPresupuestado = 0;

    this.MontoSolicitado = parseFloat(this.formNuevaSolicitud.value['MontoSolicitado']);

    this.Diferencia = 0; //reseteo la suma cada que escriban un numero y lo vuelvo a calcular abajo

    this.Diferencia = this.MontoSolicitado - this.CostoPresupuestado ;  // MontoSolicitado menos CostoPresupuestado

    this.formNuevaSolicitud.patchValue({Diferencia: this.Diferencia});

    console.log(this.Diferencia);
    //  for(let detalle of this.detalles.controls)
    //  {
    //    if(_isNumberValue(parseFloat(detalle.value['Monto'])) && parseFloat(detalle.value['Monto'])!=undefined)
    //    this.sumaMontosPorConcepto+=parseFloat(detalle.value['Monto']);
    //  }

    //this.faltanteDetallar = this.CostoPresupuestado - this.sumaMontosPorConcepto;

  }

  //ef = errores - formulario--------------------------------------
  public efCompraGeneral: any = {
    Proveedor: '',
    MontoSolicitado: '',
    Comentarios: ''
  }
  //---------------------------------------------------------------

  //mvf = mensajes - validación - formulario-----------------------
  public mvfCompraGeneral: any = {
    Proveedor: {
      required: 'Rellena este campo obligatorio.'
    },
    MontoSolicitado: {
      required: 'Rellena este campo obligatorio.'
    },
    Comentarios: {
      required: 'Rellena este campo obligatorio.'
    }
  }
  //---------------------------------------------------------------.

  //dfc = detecta - cambios - formulario
  private dcfCompraGeneral(datos?: any) : void {
    if(!this.formNuevaSolicitud){return;}
    const formulario = this.formNuevaSolicitud;
    for(const campo in this.efCompraGeneral){
      if(this.efCompraGeneral.hasOwnProperty(campo)){
        //Limpia mensjaes de error precios de existir.
        this.efCompraGeneral[campo] = '';
        const control = formulario.get(campo);
        if(control && control.dirty && !control.valid){
          const mensajes = this.mvfCompraGeneral[campo];
          for (const clave in control.errors){
            if(control.errors.hasOwnProperty(clave)){
              this.efCompraGeneral[campo] += mensajes[clave] + ' ';
            }
          }
        }
      }
    }
  }
  //---------------------------------------------------------------

  //Requeridos------------------------------------------------------
  public esRequeridoCompraGeneral(campo: string): boolean {
    const campoFormulario = this.formNuevaSolicitud.get(campo);
    let validator: any;
    if (campoFormulario) {
      validator = (campoFormulario.validator ? campoFormulario.validator({} as AbstractControl) : false);
      if (validator && validator.required) {
        return true;
      }
    }
    return false;
  }
  //---------------------------------------------------------------

  openSnackBar(mensjae:string) {
    this._snackBar.open(mensjae, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }
  //-------------------------------

  percentDone: number;
  uploadSuccess: boolean;


  upload(files: File[]){
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file', f))
    this.http.post('https://file.io', formData)
      .subscribe(event => {
        console.log('done')
      })
  }

  clickeaste(){
    if(Math.round(this.Archivo.nativeElement.files[0].size / 1024) <= 20480)//son KB
    {
      this.NombreArchivo = this.Archivo.nativeElement.files[0].name;
    }
    else{
      this.Archivo.nativeElement.value = "";
      this.NombreArchivo = "";
      this.openSnackBar('No se permite subir archivos de 20 MB o más.');
    }
  }

  onChangeEvent(event: any){
    //console.log(event.target.value);
    try{

      if(parseFloat(event.target.value)> this.SaldoaFavor )
      {
        this.openSnackBar('No puede solicitar más de su saldo a favor.');
      }

    }
    catch
    {}
  }

  onChange(ob: MatSlideToggleChange) {
    this.mesesActivado =  ob.checked;

    // let matSlideToggle: MatSlideToggle = ob.source;
    // console.log(matSlideToggle.color);
    // console.log(matSlideToggle.required);
  }

  cambiarCostos(ob: MatSlideToggleChange){
    this.costosActivado = ob.checked;
    if(this.costosActivado){
      this.desbloquearControlesCostos();
    }
    else
    {
      //Los bloque y regreso los valores por defecto
      this.bloquearControlesCostos();
    }
  }

  utilizarTotal(){
    //this.formNuevaSolicitud.value['MontoSolicitado'] = this.Total;
    this.formNuevaSolicitud.patchValue({MontoSolicitado: this.Total});
  }

  detalle(){
    let montoSeleccionadoDelMes: number = 0;
    const dialogRef$ = this.dialog.open(DistribucionMesesComponent,{
      disableClose: false,
      autoFocus: true,

      data: { valor: this.resultadosPartidasOrdinarias, montoSeleccionadoDelMes: 0 },
    });

    dialogRef$.afterClosed().subscribe(result => {
      console.log(result);

      if(result == undefined)
      {
        console.log('No seleccionaron ningún mes');
      }
      else
      {
        montoSeleccionadoDelMes = result;
        this.formNuevaSolicitud.patchValue({MontoSolicitado: montoSeleccionadoDelMes});
      }
    });
  }

  limpiarMontoSolicitado(){
    this.formNuevaSolicitud.patchValue({ MontoSolicitado: null });
  }
}
