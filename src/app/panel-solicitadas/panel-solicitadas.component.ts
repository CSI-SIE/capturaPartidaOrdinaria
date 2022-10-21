import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CatalogoService } from '../services/catalogo.servicios';
import { HistorialSolicitudesModel } from '../shered/models/historial-solicitudes.model';


@Component({
  selector: 'panel-solicitadas',
  templateUrl: './panel-solicitadas.component.html',
  styleUrls: ['./panel-solicitadas.component.scss']
})
export class PanelSolicitadasComponent implements OnInit {
  @Input() IdMovimiento = 0; //
  private suscripciones: Subscription[];

  showSpinner = false;
  clickBusqueda = false;
  sinResultados = true;

  //Tabla ==============================================================================================
  pageSizeOptions = [10, 20];
  tamanoTabla = "w-sm-90 w-lg-70 w-xl-50";

  resultadosPartidasOrdinarias: HistorialSolicitudesModel [] = [];

  public displayedColumnsGrupo = {
    columnas: {

      loginCaptura: ['Nombre'],
      fechaCaptura: ['Fecha de captura'],
      comentario: ['Comentario'],
      autorizadoJefe: ['Revisión jefe'],
      autorizadoTesoreria: ['Revisión tesorería'],
      importeSolicitado: ['Importe solicitado'],
      proveedor: ['proveedor'],
      paraMostrar: [
        'loginCaptura',
        'proveedor',
        'comentario',
        'importeSolicitado',
        'autorizadoJefe',
        'autorizadoTesoreria',
        'fechaCaptura',
        ]
    }
  };
//-Tabla ===========================================================================================

  constructor(private _catalogoServicioBase: CatalogoService,) {
    this.suscripciones =[];
  }

  ngOnInit(): void {

    this.resultadosPartidasOrdinarias = [];
    this.showSpinner = true;
    const listar$ = this._catalogoServicioBase.listarPartidasOrdinariasDetalle(this.IdMovimiento).subscribe(
      {
        next: (data) => {
          this.resultadosPartidasOrdinarias = data;
          console.log(this.resultadosPartidasOrdinarias);
          if(data[0].hasOwnProperty('idPartida'))
            {
              this.sinResultados = false;
            }
            else
            {
              this.sinResultados = true;
            }
        },
        error: (errores) => {
          console.error(errores);
          this.showSpinner = false;
        },
        complete:()=>{
          this.showSpinner = false;
        }
      }
    );
    this.suscripciones.push(listar$);

  }
}
