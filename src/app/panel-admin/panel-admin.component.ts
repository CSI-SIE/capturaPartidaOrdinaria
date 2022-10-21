import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { CatalogoPeriodosService } from '../services/catalogo-periodos.servicios';
import { CatalogoService } from '../services/catalogo.servicios';
import { CatalogoDepartamentos } from '../shered/models/departamentos.models';
import { partidaOrdinaria } from '../shered/models/partida-ordinaria.models';
import { CatalogoPeriodos } from '../shered/models/periodos.models';

@Component({
  selector: 'panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.scss']
})
export class PanelAdminComponent implements OnInit {

  title = 'Solicitud de partida ordinaria seleccionando el mes';

  periodoDefault = 0;

  private suscripciones: Subscription[];

  public formularioReporte: UntypedFormGroup;

  public catalogoPeriodo: CatalogoPeriodos[];
  public catalogoDepartamentos: CatalogoDepartamentos[];
  public partidaOrdinariaModel: partidaOrdinaria[];

  showSpinner = false;
  clickBusqueda = false;
  sinResultados = false;

  private finalizaSubscripcionrecargarTabla: Subscription = null;

  resultadosPartidasOrdinarias: partidaOrdinaria[] = [];

  //snack-bar---
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  //------------

  //Tabla ==============================================================================================

  pageSizeOptions = [10, 20, 30, 40];
  tamanoTabla = "w-sm-90 w-lg-70 w-xl-50";

  // resultadosPartidasOrdinarias:partidaOrdinaria[] = [
  //   {
  //     idmovimiento: 177127,
  //     iddepartamento	: 2793,
  //     nombreDepartamento: 'CENTRO DE DESARROLLO',
  //     cuenta: '600-0330-173',
  //     unidades: 52,
  //     descripcion: 'HONORARIOS Taller de Microsoft Excel 2016 niveles básico-intermedio y avanzado',
  //     justificacion: 'HONORARIOS',
  //     precio: 406,
  //     mes01: 3518.66,
  //     mes02: 3518.66,
  //     mes03: 3518.66,
  //     mes04: 3518.66,
  //     mes05: 3518.66,
  //     mes06: 3518.66,
  //     prorrateo: 0,
  //     iva: 1,
  //     ingreso: 0,
  //     idivade: 0,
  //     autorizada: 'Si',
  //     semestre: 'ENE-JUN 2022',
  //     julio: '',
  //     agosto: '',
  //     septiembre: '',
  //     octubre: '',
  //     noviembre: '',
  //     diciembre: ''
  //   },
  //   {
  //     idmovimiento: 177128,
  //     iddepartamento	: 2793,
  //     nombreDepartamento: 'CENTRO DE DESARROLLO',
  //     cuenta: '600-0330-173',
  //     unidades: 52,
  //     descripcion: 'HONORARIOS Taller de Microsoft Excel 2016 niveles básico-intermedio y avanzado',
  //     justificacion: 'HONORARIOS',
  //     precio: 406,
  //     mes01: 3518.66,
  //     mes02: 3518.66,
  //     mes03: 3518.66,
  //     mes04: 3518.66,
  //     mes05: 3518.66,
  //     mes06: 3518.66,
  //     prorrateo: 0,
  //     iva: 1,
  //     ingreso: 0,
  //     idivade: 0,
  //     autorizada: 'Si',
  //     semestre: 'ENE-JUN 2022',
  //     julio: '',
  //     agosto: '',
  //     septiembre: '',
  //     octubre: '',
  //     noviembre: '',
  //     diciembre: ''
  //   },
  //   {
  //     idmovimiento: 177129,
  //     iddepartamento	: 2793,
  //     nombreDepartamento: 'CENTRO DE DESARROLLO',
  //     cuenta: '600-0330-173',
  //     unidades: 52,
  //     descripcion: 'HONORARIOS Taller de Microsoft Excel 2016 niveles básico-intermedio y avanzado',
  //     justificacion: 'HONORARIOS',
  //     precio: 406,
  //     mes01: 3518.66,
  //     mes02: 3518.66,
  //     mes03: 3518.66,
  //     mes04: 3518.66,
  //     mes05: 3518.66,
  //     mes06: 3518.66,
  //     prorrateo: 0,
  //     iva: 1,
  //     ingreso: 0,
  //     idivade: 0,
  //     autorizada: 'Si',
  //     semestre: 'ENE-JUN 2022',
  //     julio: '',
  //     agosto: '',
  //     septiembre: '',
  //     octubre: '',
  //     noviembre: '',
  //     diciembre: ''
  //   },
  //   {
  //     idmovimiento: 177130,
  //     iddepartamento	: 2793,
  //     nombreDepartamento: 'CENTRO DE DESARROLLO',
  //     cuenta: '600-0330-173',
  //     unidades: 52,
  //     descripcion: 'HONORARIOS Taller de Microsoft Excel 2016 niveles básico-intermedio y avanzado',
  //     justificacion: 'HONORARIOS',
  //     precio: 406,
  //     mes01: 3518.66,
  //     mes02: 3518.66,
  //     mes03: 3518.66,
  //     mes04: 3518.66,
  //     mes05: 3518.66,
  //     mes06: 3518.66,
  //     prorrateo: 0,
  //     iva: 1,
  //     ingreso: 0,
  //     idivade: 0,
  //     autorizada: 'Si',
  //     semestre: 'ENE-JUN 2022',
  //     julio: '',
  //     agosto: '',
  //     septiembre: '',
  //     octubre: '',
  //     noviembre: '',
  //     diciembre: ''
  //   },
  //   {
  //     idmovimiento: 177131,
  //     iddepartamento	: 2793,
  //     nombreDepartamento: 'CENTRO DE DESARROLLO',
  //     cuenta: '600-0330-173',
  //     unidades: 52,
  //     descripcion: 'HONORARIOS Taller de Microsoft Excel 2016 niveles básico-intermedio y avanzado',
  //     justificacion: 'HONORARIOS',
  //     precio: 406,
  //     mes01: 3518.66,
  //     mes02: 3518.66,
  //     mes03: 3518.66,
  //     mes04: 3518.66,
  //     mes05: 3518.66,
  //     mes06: 3518.66,
  //     prorrateo: 0,
  //     iva: 1,
  //     ingreso: 0,
  //     idivade: 0,
  //     autorizada: 'Si',
  //     semestre: 'ENE-JUN 2022',
  //     julio: '',
  //     agosto: '',
  //     septiembre: '',
  //     octubre: '',
  //     noviembre: '',
  //     diciembre: ''
  //   }
  // ];

  //Estos nombres cambian respecto a como lo mandan de la consulta

  public displayedColumnsGrupo = {
    columnas: {
    idmovimiento: ['Folio'],
    iddepartamento: ['iddepartamento'],
    nombreDepartamento: ['Nombre del departamento'],
    cuenta: ['Cuenta'],
    unidades: ['Unidades'],
    descripcion: ['Descripción'],
    justificacion: ['Justificación'],
    precio: ['Precio'],
    total: ['Total (Unidades x Precio)'],
    mes01: ['Julio'],
    mes02: ['Agosto'],
    mes03: ['Septiembre'],
    mes04: ['Octubre'],
    mes05: ['Noviembre'],
    mes06: ['Diciembre'],
    prorrateo: ['Prorrateo'],
    iva: ['Iva'],
    ingreso: ['Ingreso'],
    idivade: ['Idivade'],
    autorizada: ['Autorizada'],
    semestre: ['semestre'],
    utilizado: ['Utilizado'],
    saldo: ['Saldo restante'],
    estatus: ['Estatus'],
    expand: [''],
    ver:['Solicitar'],

      paraMostrar: [
      'descripcion',
      'justificacion',
      'unidades',
      'precio',
      'total',
      'mes01','mes02','mes03','mes04','mes05','mes06',
      'utilizado',
      'saldo',
      'estatus',
      'expand',
      'ver']
    }
  };
//-Tabla ===========================================================================================


  constructor(
    private _fb: UntypedFormBuilder,
    private _catalogoService: CatalogoService,
    private _catalogoPeriodosService: CatalogoPeriodosService,
    private _snackBar: MatSnackBar,
    ) {

    this.resultadosPartidasOrdinarias = [];
    this.suscripciones = [];

    this.formularioReporte = this._fb.group({
      Periodo: [
        null,
        [
          Validators.required
        ]
      ],
      Departamento: [
        null,
        [
          Validators.required
        ]
      ]
    });

    const observableValidadorFormulario$ =
        this.formularioReporte.valueChanges.subscribe(
          (datos) => {
            this.dcfSolicitudReporte(datos);
          }
        );

      this.suscripciones.push(observableValidadorFormulario$);
      this.dcfSolicitudReporte();


      //Catálogos
      this.catalogoPeriodo = [];
      this.catalogoDepartamentos = [];
      this.partidaOrdinariaModel = [];
  }


  ///---------------
  ngOnInit(): void {
  //Recarga la tabla siempre y cuando la respuesta en el servicio this._catalogosService
    //sea igual a 1, que se envía desde el detalle de la solicitud.
  /*this.finalizaSubscripcionrecargarTabla = this._catalogoService.recargarTabla$.subscribe((resp)=>{
      if(resp == 1){ this.onSubmit(); } });*/

  const periodos$ = this._catalogoPeriodosService.CatalogoPeriodos().subscribe(
    {
      next:(data: any) =>{
        this.catalogoPeriodo = data;
        console.log(data);
        this.catalogoPeriodo.forEach(element => {
          if(element.actual == 1){
            this.formularioReporte.value['Periodo'] = element.idPeriodo;
            this.periodoDefault = element.idPeriodo;
          }
        });



      },
      error: (errores) =>{
        console.error(errores);
      },
      complete:()=>{
        this.cargarDepartamentos();
      }

    }
  );
    this.suscripciones.push(periodos$);


    //this.suscripciones.push(this.finalizaSubscripcionrecargarTabla);

  }

 onSubmit(){

 }


 cargarDepartamentos() {
    setInterval(() => {
      this.departamentos();
    },380)
  }

 departamentos(){
 if(this.formularioReporte.value['Periodo']>0)
 {
    const Catalogodepartamentos$ = this._catalogoService.CatalogoDepartamentos(
      this.formularioReporte.value['Periodo']
    ).subscribe(
      {
        next:(data: any) =>{ this.catalogoDepartamentos = data; },
        error: (errores) =>{ console.error(errores); },
        complete:()=>{}
      }
    );
      this.suscripciones.push(Catalogodepartamentos$);
  }
  else
  {
    this.openSnackBar('No hay un periodo seleccionado');
  }

  }



  //Para consultar todas las partidas ordinarias sin importar el departamento.
  // consultaTotasPartidasOrdinarias(){
  //   this.showSpinner = true;
  //   this.resultadosPartidasOrdinarias = [];
  //   const consultaTotasPartidasOrdinarias$ = this._catalogoService.ConsultaTodasPartidasOrdinarias(
  //     this.formularioReporte.value['Periodo']
  //   ).subscribe(
  //     {
  //       next:(data: any) =>{
  //         this.resultadosPartidasOrdinarias = data;

  //         if(this.partidaOrdinariaModel.length<=0)
  //         {this.sinResultados = true;}
  //         else
  //         {this.sinResultados = false;}
  //       },
  //       error: (errores) =>{
  //         console.error(errores);
  //       },
  //       complete:()=>{
  //         this.resultadosPartidasOrdinarias = this.partidaOrdinariaModel;
  //       }

  //     }
  //   );
  //     this.suscripciones.push(consultaTotasPartidasOrdinarias$);
  // }

  //Para consultar partidas ordinarias filtradas por Periodo y Departamento
  consultaPartidasOrdinariasPorDepartamento(){

    this.showSpinner = true;

    const consultaPartidasOrdinariasPorDepartamento$ = this._catalogoService.ConsultaPartidasOrdinariasPorDepartamento(
      this.formularioReporte.value['Periodo'],
      this.formularioReporte.value['Departamento']
      ).subscribe(
      {
        next:(data: any) =>{

          this.showSpinner = true;

          this.resultadosPartidasOrdinarias = [];
          this.partidaOrdinariaModel = data;
          this.resultadosPartidasOrdinarias = data;

          console.log(data);

          if(this.resultadosPartidasOrdinarias.length<=0)
          {
            this.sinResultados = true;
          }
          else
          {
            this.sinResultados = false;
            this.showSpinner = false;
          }

        },
        error:(errores) =>{
          console.error(errores);
          this.showSpinner = false;

        },
        complete:()=>{
          this.showSpinner = false;
        }

      }
    );
      this.suscripciones.push(consultaPartidasOrdinariasPorDepartamento$);
  }

  disteClick(){
    this.clickBusqueda = true;
  }


  //ef = errores - formualrio
  public efSolicitudReporte: any = {
    Periodo: '',
    Departamento: ''
  };

  //mvf - mensajes de validación del formulario
  public mvfSolicitudReporte: any = {
    Periodo: {
      required: 'Selecciona un periodo'
    },
    Departamento: {
      required: 'Selecciona un departamento'
    }
  };


  //dcf = detecta - cambios - formulario-----------------------------
  private dcfSolicitudReporte(datos?: any): void{
    if(!this.formularioReporte)
    {return;}
    const formulario = this.formularioReporte;

    for(const campo in this.efSolicitudReporte){
      //Limpia mensajes de error previos de existir
      this.efSolicitudReporte[campo] = '';
      const control = formulario.get(campo);

      if(control && control.dirty && control.valid){
        const mensajes = this.mvfSolicitudReporte[campo];

        for(const clave in control.errors){
          if(control.errors.hasOwnProperty(clave)){
            this.efSolicitudReporte[campo] += mensajes[clave] + ' ';
          }
        }
      }
    }
  }
  //--------------------------------------------------------------

  //Es requerido ------------------------------------------------
  public esRequerido(campo:string):boolean{
    const campoFormulario = this.formularioReporte.get(campo);
    let validator: any;
    if(campoFormulario){
      validator = (campoFormulario.validator ? campoFormulario.validator({} as AbstractControl): false);
      if(validator && validator.required){
        return true;
      }
    }
    return true;
  }
  //--------------------------------------------------------------

  openSnackBar(mensaje:string) {
    this._snackBar.open(mensaje, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000
    });
  }

  ngOnDestroy(){
    console.info(this.suscripciones.length + ' suscripciones serán destruidas');
    this.suscripciones.forEach((suscripcion) => {
      suscripcion.unsubscribe();
    })
  }

}
