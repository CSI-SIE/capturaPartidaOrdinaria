import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio.component';
import { InicioRoutingModule } from './inicio-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule} from '@angular/material/table';
import { TablaDinamicaComponent } from '../tabla-dinamica/tabla-dinamica.component';
import { NuevaComponent } from '../nueva/nueva.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MaterialModule } from '../shered/material/material.module';
import { MatIconModule } from '@angular/material/icon';
import { OrdenCompraComponent } from '../orden-compra/orden-compra.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PanelAdminComponent } from '../panel-admin/panel-admin.component';
import { TablaDinamicaAdminComponent } from '../tabla-dinamica-admin/tabla-dinamica-admin.component';
import { PanelMesComponent } from '../panel-mes/panel-mes.component';
import { TablaDinamicaMesComponent } from '../tabla-dinamica-mes/tabla-dinamica-mes.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { RevisarJefeComponent } from '../revisar-jefe/revisar-jefe.component';
import { RevisarTesoreriaComponent } from '../revisar-tesoreria/revisar-tesoreria.component';
import { RechazarComponent } from '../rechazar/rechazar.component';
import { DistribucionMesesComponent } from '../distribucion-meses/distribucion-meses.component';
import { DetalleSolicitudPresupuestadaComponent } from '../detalle-solicitud-presupuestada/detalle-solicitud-presupuestada.component';
import { TablaDinamicaSolicitadasComponent } from '../tabla-dinamica-solicitadas/tabla-dinamica-solicitadas.component';
import { PanelSolicitadasComponent } from '../panel-solicitadas/panel-solicitadas.component';



@NgModule({
  declarations: [
    InicioComponent,
    TablaDinamicaComponent,
    NuevaComponent,
    OrdenCompraComponent,
    TablaDinamicaAdminComponent,
    PanelAdminComponent,
    TablaDinamicaMesComponent,
    PanelMesComponent,
    DistribucionMesesComponent,
    DetalleSolicitudPresupuestadaComponent,
    TablaDinamicaSolicitadasComponent,
    PanelSolicitadasComponent,

    RevisarJefeComponent,
    RevisarTesoreriaComponent,
    RechazarComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MaterialModule,
    MatIconModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatInputModule
  ]
})
export class InicioModule { }
