import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { RechazarComponent } from '../rechazar/rechazar.component';
import { CatalogoService } from '../services/catalogo.servicios';

@Component({
  selector: 'revisar-jefe',
  templateUrl: './revisar-jefe.component.html',
  styleUrls: ['./revisar-jefe.component.scss']
})
export class RevisarJefeComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  private suscripciones: Subscription[];

  _catalogoService: CatalogoService;


  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  public dialogRef: MatDialogRef<any>,
  private _snackBar: MatSnackBar,
  public dialog: MatDialog,) {
    this.suscripciones = [];
   }

  panelOpenState = false;

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['item', 'cost'];
  transactions: any[] = [
    {item: this.data.valor.unidades2, cost: this.data.valor.precio},
  ];


  rechazar(id:number){
    let motivo:string = '';

    const dialogRef$ = this.dialog.open(RechazarComponent,{
      width: '50%',
      disableClose: true,
      autoFocus: true,
      data: {motivo: ''},
    });

    dialogRef$.afterClosed().subscribe(result =>{
      if(result == undefined)
      {
        console.log('Se canceló el Rechazo');
      }
      else
      {
        motivo = result;

        console.log('Se va a rechazar la partida con el id: ' + id);

          const motivoRechazo$ = this._catalogoService.rechazarJefe(
            id,
            motivo,
            1111111111111111111111111111111).subscribe(
            {
              next: () =>{
                //aquí podría esperar respuesta de la DB o API para mostrar si fue éxitoso

                //Entra al servicio de catalogos y en recargarTabla le envía un 1
                //con este le estamos diciendo qie recargue la tabla.
                this._catalogoService.recargarTabla.next(1);
              },
              error: (errores) =>{
                console.error(errores);
              },
              complete: () =>{
                this.openSnackBar('Partida ordinaria rechazada.');
              }
            }
          );
            this.suscripciones.push(motivoRechazo$);
      }
    });
  }

  guardar(id:number){
    const guardarAprobado$ = this._catalogoService.aprobarJefe(
      id,
      11111111111111111111
      ).subscribe(
      {
        next: ()=>{
          //aquí podría esperar respuesta de la DB o API para mostrar si fue éxitoso
          this._catalogoService.recargarTabla.next(1);
        },
        error:(errores) => {
          console.error(errores);
        },
        complete: () => {
          this.openSnackBar('Partida ordinaria aprobada.');
        }
      }
    );
    this.suscripciones.push(guardarAprobado$);

  }

  openSnackBar(mensaje:string) {
    this._snackBar.open(mensaje, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000
    });
  }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }

}
