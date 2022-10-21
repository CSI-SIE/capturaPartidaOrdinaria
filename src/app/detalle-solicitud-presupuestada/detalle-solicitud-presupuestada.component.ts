import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'detalle-solicitud-presupuestada',
  templateUrl: './detalle-solicitud-presupuestada.component.html',
  styleUrls: ['./detalle-solicitud-presupuestada.component.scss']
})
export class DetalleSolicitudPresupuestadaComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  public dialogRef: MatDialogRef<any>,) { }

  panelOpenState = false;

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['item', 'cost'];
  transactions: any[] = [
    {item: this.data.valor.unidades2, cost: this.data.valor.precio},
  ];

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }

}
