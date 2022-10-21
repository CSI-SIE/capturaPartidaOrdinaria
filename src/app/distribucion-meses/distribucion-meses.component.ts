import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'distribucion-meses',
  templateUrl: './distribucion-meses.component.html',
  styleUrls: ['./distribucion-meses.component.scss']
})
export class DistribucionMesesComponent implements OnInit {

  displayedColumns: string[] = ['item', 'cost'];

  transactions: any[] = [];

  primerSemestre: any[] = [

    {item: 'Enero', cost: parseFloat(this.data.valor.mes01)},
    {item: 'Febrero', cost: parseFloat(this.data.valor.mes02)},
    {item: 'Marzo', cost: parseFloat(this.data.valor.mes03)},
    {item: 'Abril', cost: parseFloat(this.data.valor.mes04)},
    {item: 'Mayo', cost: parseFloat(this.data.valor.mes05)},
    {item: 'Junio', cost: parseFloat(this.data.valor.mes06)}
  ];

  segundoSemestre: any[] = [

    {item: 'Julio', cost: parseFloat(this.data.valor.mes01)},
    {item: 'Agosto', cost: parseFloat(this.data.valor.mes02)},
    {item: 'Septiembre', cost: parseFloat(this.data.valor.mes03)},
    {item: 'Octubre', cost: parseFloat(this.data.valor.mes04)},
    {item: 'Noviembre', cost: parseFloat(this.data.valor.mes05)},
    {item: 'Diciembre', cost: parseFloat(this.data.valor.mes06)}

  ];

  constructor( @Inject(MAT_DIALOG_DATA) public data:any,
  public dialogRef: MatDialogRef<any> ) { }

  ngOnInit(): void {

    console.log(this.data.valor.idPeriodo);
    if(this.data.valor.idPeriodo%2 == 0)
    {
      //console.log('Es par');
      this.transactions = this.primerSemestre;
    }
    else
    {
      //console.log('Es imPar');
      this.transactions = this.segundoSemestre;
    }
  }

  getTotalCost() {
    return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }

  apocoSiTilin(row)
  {
    console.log(row);
    console.log(row.cost);
    this.data.montoSeleccionadoDelMes = row.cost;
    this.dialogRef.close();
  }

}
