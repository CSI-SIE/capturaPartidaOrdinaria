import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, Inject, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DistribucionMesesComponent } from '../distribucion-meses/distribucion-meses.component';
import { DetalleSolicitudPresupuestadaComponent } from '../detalle-solicitud-presupuestada/detalle-solicitud-presupuestada.component';
import { CatalogoService } from '../services/catalogo.servicios';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { RevisarJefeComponent } from '../revisar-jefe/revisar-jefe.component';
import { RevisarTesoreriaComponent } from '../revisar-tesoreria/revisar-tesoreria.component';

@Component({
  selector: 'tabla-dinamica-mes',
  templateUrl: './tabla-dinamica-mes.component.html',
  styleUrls: ['./tabla-dinamica-mes.component.scss']
})
export class TablaDinamicaMesComponent implements OnInit {

  @Input() tipoTabla:number=0;
  @Input() resultadosPartidasOrdinarias:any [] =[];
  @Input() tamanoTabla: string = '';
  @Input() pageSizeOptions= [];
  @Input() public displayedColumns;


    //tabla variables
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild('paginador', {static: false}) paginator: MatPaginator ;
  dataSource = new MatTableDataSource<any[]>();
  mostrarPaginador:boolean = false;

  //snack-bar---
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  //------------

  private suscripciones: Subscription[];

  ngOnChanges(changes: SimpleChanges){
    try {
      let change = changes['resultadosPartidasOrdinarias'];

      if(!change.firstChange){
        this.addData();
      }
    } catch (error) { }

    /*for (let propName in changes) {
      let change = changes[propName];
      let curVal  = JSON.stringify(change.currentValue);
      let prevVal = JSON.stringify(change.previousValue);
            console.log(curVal);
            console.log(prevVal);
         }*/


  }

    ngOnInit(): void {}

    //se mostrara para setear el formulario de editar que se mostrara en el modal
    reiniciar(){
      this.resultadosPartidasOrdinarias = [];
    }

    conocerFilaSeleccionada(row){
    //console.log(row);
    }

    constructor( public cdRef: ChangeDetectorRef,
      public dialog: MatDialog,
      public router: Router,
      private _catalogoService: CatalogoService,
      private _snackBar: MatSnackBar,
      ) //private _bottomSheet: MatBottomSheet
    {
      this.suscripciones = [];
    }

    aplicarFiltro(filterValue){
      this.dataSource.filter = filterValue.target.value.trim().toLowerCase();
    }

    addData() {
      this.cdRef.detectChanges();
      //seteo los datos de la tabla despues de cargarse la vista y detecto los cambios
      this.dataSource = new MatTableDataSource<any[]>(this.resultadosPartidasOrdinarias);
      this.cdRef.detectChanges();

      //luego renderiso la tabla para motrar el valor nuevo
      this.table.renderRows();
      //Despues de eso actualiza el paginador
      this.dataSource.paginator = this.paginator;
      this.cdRef.detectChanges();
    }

  ngAfterViewInit(): void {
    this.addData();
  }

  solicitar(valor){

    this.consultarPermisoAlta(valor['idmovimiento']);
    //this.comoGorditaenTobogan(valor['idmovimiento']);


  }

  detalle(valor){
    const dialogRef = this.dialog.open(DetalleSolicitudPresupuestadaComponent,{
      disableClose: false,
      autoFocus: true,
      data: { valor },
    });
  }

  revisarJefe(valor){
    const dialogRef = this.dialog.open(RevisarJefeComponent,{
      disableClose: false,
      autoFocus: true,
      data: { valor },
    });
  }

  revisarTesoreria(valor){
    const dialogRef = this.dialog.open(RevisarTesoreriaComponent,{
      disableClose: false,
      autoFocus: true,

      data: { valor },
    });
  }

  detallePorMes(valor){
    const dialogRef = this.dialog.open(DistribucionMesesComponent,{
      width: '30%',
      disableClose: false,
      autoFocus: true,
      data: { valor },
    });
  }

  //**Comprobar si puede solicitar partidas ordinarias */
  consultarPermisoAlta(_idmovimiento){
    const consultarPermisoAlta$ = this._catalogoService.ConsultaPermisoAlta(
      _idmovimiento
      ).subscribe(
      {
        next:(data: any) =>{

          if(data[0].error == 0)
          {
            console.log(data);
            this.router.navigateByUrl('/nueva/' + _idmovimiento);
          }
          else
          {
            this.openSnackBar(data[0].mensaje);
            console.log(data);
          }
        },
        error:(errores) =>{
          console.error(errores);
        },
        complete:()=>{

        }

      }
    );
      this.suscripciones.push(consultarPermisoAlta$);

  }

  comoGorditaenTobogan(_idmovimiento){

    this.router.navigateByUrl('/nueva/' + _idmovimiento);


  }

  openSnackBar(mensaje:string) {
    this._snackBar.open(mensaje, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 4000
    });
  }


}
