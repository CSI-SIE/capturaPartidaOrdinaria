import { _isNumberValue } from '@angular/cdk/coercion';
import { Component } from '@angular/core';
import { FormControl, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'orden-compra',
  templateUrl: './orden-compra.component.html',
  styleUrls: ['./orden-compra.component.scss']
})
export class OrdenCompraComponent {

  public formNuevaSolicitud: UntypedFormGroup;
  public GuardadoCorrectamente:boolean = false;

  //Autocompletar
  myControl = new FormControl('');
  options: string[] = ['Falta agregar proveedores desde la DB, S.A. de C.V.','Pemex S.A. de C.V.', 'Proveedor Numero Uno S.A. de C.V.', 'Proveedor Numero Dos S.A. de C.V.', 'Proveedor Numero Tres S.A. de C.V.'];
  filteredOptions: Observable<string[]>;
  //------------

  public sumaMontosPorConcepto:number;

  constructor(
    private _fb: UntypedFormBuilder,
  ) {

    this.formNuevaSolicitud = this._fb.group({
      Proveedor: [
        '',
        [
          Validators.required
        ]
      ],

      Folio: [
        '',
        [
          Validators.required
        ]
      ],

      Fecha: [
        '',
        [
          Validators.required
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

  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
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

  deleteDetalleConcepto(i){
    if(this.detalles.length>1){
    this.detalles.removeAt(i)
    }
  }

  onSubmit(){

  }

  get detalles() {
    return this.formNuevaSolicitud.get('detalleConceptos') as UntypedFormArray;
  }

  sumar(){
    this.sumaMontosPorConcepto = 0;

    for(let detalle of this.detalles.controls)
    {
      if(_isNumberValue(parseFloat(detalle.value['Monto'])) && parseFloat(detalle.value['Monto'])!=undefined)
      this.sumaMontosPorConcepto+=parseFloat(detalle.value['Monto']);
    }
  }

}
