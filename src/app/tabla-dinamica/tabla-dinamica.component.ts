import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, Inject, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'tabla-dinamica',
  templateUrl: './tabla-dinamica.component.html',
  styleUrls: ['./tabla-dinamica.component.scss']
})
export class TablaDinamicaComponent implements OnInit {

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

    constructor( public cdRef: ChangeDetectorRef, public dialog: MatDialog)
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

  desplegarDialogo(valor){

  }

 }
