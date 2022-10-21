import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, Inject, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'tabla-dinamica-solicitadas',
  templateUrl: './tabla-dinamica-solicitadas.component.html',
  styleUrls: ['./tabla-dinamica-solicitadas.component.scss']
})
export class TablaDinamicaSolicitadasComponent implements OnInit {

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

  ngOnChanges(changes: SimpleChanges){
    try {
      let change = changes['resultadosPartidasOrdinarias'];
      if(!change.firstChange){
        this.addData();
      }
    } catch (error) { }
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
      public router: Router) //private _bottomSheet: MatBottomSheet
    {}

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

    console.log('Falta de realizar');
    //this.router.navigateByUrl('/nueva/' + valor['idmovimiento']);

  }

  // detalle(valor){
  //   const dialogRef = this.dialog.open(DetalleSolicitudPresupuestadaComponent,{
  //     disableClose: false,
  //     autoFocus: true,

  //     data: { valor },
  //   });
  // }

  // detallePorMes(valor){
  //   const dialogRef = this.dialog.open(DistribucionMesesComponent,{
  //     width: '30%',
  //     disableClose: false,
  //     autoFocus: true,
  //     data: { valor },
  //   });
  //}

}
