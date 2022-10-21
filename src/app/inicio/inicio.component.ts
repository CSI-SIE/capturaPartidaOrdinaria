import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, repeat, Subscription, timer } from 'rxjs';
import { CatalogoAdministrativo } from '../services/catalogo-administrativo';
import { CatalogoPeriodosService } from '../services/catalogo-periodos.servicios';
import { CatalogoService } from '../services/catalogo.servicios';
import { CatalogoDepartamentos } from '../shered/models/departamentos.models';
import { partidaOrdinaria } from '../shered/models/partida-ordinaria.models';
import { CatalogoPeriodos } from '../shered/models/periodos.models';
import { Permisos } from '../shered/models/permisos.models';

@Component({
  selector: 'inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})


export class InicioComponent implements OnInit {

  title = 'Solicitar Partidas ordinarias';

  idPeriodo = 0;
  accionConsulta = 0;

  private suscripciones: Subscription[];

  public formularioReporte: UntypedFormGroup;

  public catalogoPeriodo: CatalogoPeriodos[];
  public catalogoDepartamentos: CatalogoDepartamentos[];
  public partidaOrdinariaModel: partidaOrdinaria[];

  showSpinner = false;
  clickBusqueda = false;
  sinResultados = false;

  resultadosPartidasOrdinarias: partidaOrdinaria[] = [];

  //snack-bar---
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  //------------

  //Tabla ==============================================================================================

  pageSizeOptions = [10, 20, 30, 40];
  tamanoTabla = "w-sm-90 w-lg-70 w-xl-50";

  /*resultadosPartidasOrdinarias:partidaOrdinaria[] = [
    {
      idmovimiento: 177126,
      iddepartamento	: 2793,
      nombreDepartamento: 'CENTRO DE DESARROLLO',
      Cuenta: '600-0330-173',
      Unidades: 52,
      Descripcion: 'HONORARIOS Taller de Microsoft Excel 2016 niveles básico-intermedio y avanzado',
      Justificacion: 'HONORARIOS',
      Precio: 406,
      mes01: 3518.66,
      mes02: 3518.66,
      mes03: 3518.66,
      mes04: 3518.66,
      mes05: 3518.66,
      mes06: 3518.66,
      Prorrateo: 0,
      Iva: 1,
      Ingreso: 0,
      Idivade: 0,
      Autorizada: 'Si',
      semestre: 'ENE-JUN 2022',
      Julio: '',
      Agosto: '',
      Septiembre: '',
      Octubre: '',
      Noviembre: '',
      Diciembre: ''
    },
    {
      idmovimiento: 177126,
      iddepartamento	: 2793,
      nombreDepartamento: 'CENTRO DE DESARROLLO',
      Cuenta: '600-0330-173',
      Unidades: 18,
      Descripcion: 'SERVICIO DE CAFETERÍA NOM 035 STPS',
      Justificacion: 'SERVICIO DE CAFETERÍA',
      Precio: 40.6,
      mes01: 0,
      mes02: 0,
      mes03: 0,
      mes04: 0,
      mes05: 730.8,
      mes06: 0,
      Prorrateo: 0,
      Iva: 1,
      Ingreso: 0,
      Idivade: 0,
      Autorizada: 'Si',
      semestre: 'ENE-JUN 2022',
      Julio: '',
      Agosto: '',
      Septiembre: '',
      Octubre: '',
      Noviembre: '',
      Diciembre: ''
    },
    {
      idmovimiento: 177126,
      iddepartamento	: 2793,
      nombreDepartamento: 'CENTRO DE DESARROLLO',
      Cuenta: '600-0330-173',
      Unidades: 52,
      Descripcion: 'HONORARIOS Taller de Microsoft Excel 2016 niveles básico-intermedio y avanzado',
      Justificacion: 'HONORARIOS',
      Precio: 406,
      mes01: 3518.66,
      mes02: 3518.66,
      mes03: 3518.66,
      mes04: 3518.66,
      mes05: 3518.66,
      mes06: 3518.66,
      Prorrateo: 0,
      Iva: 1,
      Ingreso: 0,
      Idivade: 0,
      Autorizada: 'Si',
      semestre: 'ENE-JUN 2022',
      Julio: '',
      Agosto: '',
      Septiembre: '',
      Octubre: '',
      Noviembre: '',
      Diciembre: ''
    },
    {
      idmovimiento: 177126,
      iddepartamento	: 2793,
      nombreDepartamento: 'CENTRO DE DESARROLLO',
      Cuenta: '600-0330-173',
      Unidades: 52,
      Descripcion: 'HONORARIOS Taller de Microsoft Excel 2016 niveles básico-intermedio y avanzado',
      Justificacion: 'HONORARIOS',
      Precio: 406,
      mes01: 3518.66,
      mes02: 3518.66,
      mes03: 3518.66,
      mes04: 3518.66,
      mes05: 3518.66,
      mes06: 3518.66,
      Prorrateo: 0,
      Iva: 1,
      Ingreso: 0,
      Idivade: 0,
      Autorizada: 'Si',
      semestre: 'ENE-JUN 2022',
      Julio: '',
      Agosto: '',
      Septiembre: '',
      Octubre: '',
      Noviembre: '',
      Diciembre: ''
    },
    {
      idmovimiento: 177126,
      iddepartamento	: 2793,
      nombreDepartamento: 'CENTRO DE DESARROLLO',
      Cuenta: '600-0330-173',
      Unidades: 52,
      Descripcion: 'HONORARIOS Taller de Microsoft Excel 2016 niveles básico-intermedio y avanzado',
      Justificacion: 'HONORARIOS',
      Precio: 406,
      mes01: 3518.66,
      mes02: 3518.66,
      mes03: 3518.66,
      mes04: 3518.66,
      mes05: 3518.66,
      mes06: 3518.66,
      Prorrateo: 0,
      Iva: 1,
      Ingreso: 0,
      Idivade: 0,
      Autorizada: 'Si',
      semestre: 'ENE-JUN 2022',
      Julio: '',
      Agosto: '',
      Septiembre: '',
      Octubre: '',
      Noviembre: '',
      Diciembre: ''
    }
  ];*/

  //Estos nombres cambian respecto a como lo mandan de la consulta

  public displayedColumnsGrupo = {
    columnas: {
    idmovimiento: ['idmovimiento'],
    iddepartamento: ['iddepartamento'],
    nombreDepartamento: ['Nombre del departamento'],
    cuenta: ['Cuenta'],
    unidades: ['Unidades'],
    descripcion: ['Descripción'],
    justificacion: ['Justificación'],
    precio: ['Precio'],
    mes01: ['Enero'],
    mes02: ['Febrero'],
    mes03: ['Marzo'],
    mes04: ['Abril'],
    mes05: ['Mayo'],
    mes06: ['Junio'],
    prorrateo: ['Prorrateo'],
    iva: ['Iva'],
    ingreso: ['Ingreso'],
    idivade: ['Idivade'],
    autorizada: ['Autorizada'],
    semestre: ['semestre'],
    ver:['Solicitar mes en curso'],

      paraMostrar: [

      'cuenta',
      'descripcion',
      'justificacion',
      'unidades',
      'precio',
      'mes01','mes02','mes03','mes04','mes05','mes06',

      'ver']
    }
  };
//-Tabla ===========================================================================================

//Permisos------------
  quePermisosTiene: Permisos;
//**Permisos */

constructor(
  private _fb: UntypedFormBuilder,
  private _catalogoService: CatalogoService,
  private _catalogoPeriodosService: CatalogoPeriodosService,
  private _snackBar: MatSnackBar,
  private _CatalogoAdministrativoService: CatalogoAdministrativo,
  private _router:Router,
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
    //**Primeramente hay que validar que exista una sesión porque se va a ocupar el id de la persona logeada
    // const sesion$ = this._CatalogoAdministrativoService.obtieneSesion().subscribe(
    //   {
    //     next:(data: any) =>{
    //       if(data.hasOwnProperty('success')){
    //         this._router.navigate(['/debe-iniciar-sesion-SIE']);
    //       }
    //       else{
    //         if(data.idPerson<=0){
    //           this._router.navigate(['/debe-iniciar-sesion-SIE']);
    //         }
    //         else{
                //**Consultar Permisos*/**23269 */
                // const permisos$ = this._catalogoService.PermisosSistema(data.idPerson).subscribe(
                  const permisos$ = this._catalogoService.PermisosSistema(23269).subscribe(
                  {
                    next:(data: any) =>{
                      // if(data[0].hasOwnProperty('mensaje')){
                      //   console.log(data[0].mensaje);
                      // }
                       this.quePermisosTiene = data;
                       console.log(this.quePermisosTiene);
                       this.idPeriodo = data[0].idperiodoPartidasOrd;
                       this.accionConsulta = data[0].accionConsulta;

                    },
                    error: (errores) =>{
                      console.error(errores);
                    },

                  }
                );
                this.suscripciones.push(permisos$);
                //**Termina- Consultar Permisos*/
    //         }
    //       }
    //     }
    //   }
    // );
    // this.suscripciones.push(sesion$);

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

  //Pruebas
  porcentaje: number = 50;

  get getPorcentaje(){
    return `${this.porcentaje }%`;
  }


  //**    NO SE OCUPAN      */

  //**Método  cargarPeriodos()  actualmente no se ocupa 2022-10-03*/
  // cargarPeriodos(){
     // const periodos$ = this._catalogoPeriodosService.CatalogoPeriodos().subscribe(
  //   {
  //     next:(data: any) =>{
  //       this.catalogoPeriodo = data;
  //       console.log(data);
  //       this.catalogoPeriodo.forEach(element => {
  //         if(element.actual == 1){
  //           this.formularioReporte.value['Periodo'] = element.idPeriodo;
  //           this.periodoDefault = element.idPeriodo;
  //         }
  //       });



  //     },
  //     error: (errores) =>{
  //       console.error(errores);
  //     },
  //     complete:()=>{
  //       this.cargarDepartamentos();
  //     }

  //   }
  // );
  //   this.suscripciones.push(periodos$);
  // }

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

  //**Método   consultaPartidasOrdinariasPorDepartamento()   actualmente no se ocupa  2022-10-03*/
  //Para consultar partidas ordinarias filtradas por Periodo y Departamento
  // consultaPartidasOrdinariasPorDepartamento(){

  //   this.showSpinner = true;

  //   const consultaPartidasOrdinariasPorDepartamento$ = this._catalogoService.ConsultaPartidasOrdinariasPorDepartamento(
  //     this.formularioReporte.value['Periodo'],
  //     this.formularioReporte.value['Departamento']
  //     ).subscribe(
  //     {
  //       next:(data: any) =>{

  //         this.showSpinner = true;

  //         this.resultadosPartidasOrdinarias = [];
  //         this.partidaOrdinariaModel = data;
  //         this.resultadosPartidasOrdinarias = data;


  //         if(this.resultadosPartidasOrdinarias.length<=0)
  //         {
  //           this.sinResultados = true;
  //         }
  //         else
  //         {
  //           this.sinResultados = false;
  //           this.showSpinner = false;
  //         }

  //       },
  //       error:(errores) =>{
  //         console.error(errores);
  //         this.showSpinner = false;

  //       },
  //       complete:()=>{
  //         this.showSpinner = false;
  //       }

  //     }
  //   );
  //     this.suscripciones.push(consultaPartidasOrdinariasPorDepartamento$);
  // }




}
