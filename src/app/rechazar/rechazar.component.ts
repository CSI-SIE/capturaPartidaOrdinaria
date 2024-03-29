import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'rechazar',
  templateUrl: './rechazar.component.html',
  styleUrls: ['./rechazar.component.scss']
})
export class RechazarComponent {



  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialog: MatDialog) {

    }

  public activo = false;

  validacionTextArea(){
    console.log(this.data.motivo);
    if(this.data.motivo.length <=0)
    {
      this.activo = false;
    }
    else
    {
      this.activo = true;
    }
  }

  onClick(): void {
    this.dialogRef.close();
  }

}
