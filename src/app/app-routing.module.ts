import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo:'/inicio',
    pathMatch: 'full'
  },
  {
    path:'inicio',
    loadChildren: () => import('./inicio/inicio.module').then(m =>m.InicioModule)
  },
  {
    path: 'debe-iniciar-sesion-SIE',
    loadChildren:()=>import('./sesion-sie/sesion-sie.module').then(m => m.SesionSieModule)
  },
  {
    path: 'nueva/:idmovimiento',
    loadChildren:()=>import('./nueva/nueva-routing.module').then(m => m.NuevaRoutingModule)
  },
  {
    path: 'orden-compra',
    loadChildren:()=>import('./orden-compra/orden.compra-routing.module').then(m => m.OrdenCompraRoutingModule)
  },
  {
    path:'panel-admin',
    loadChildren:()=>import('./panel-admin/panel-admin-rounting.module').then(m => m.PanelAdminRoutingModule)
  },
  {
    path:'panel-mes',
    loadChildren:()=>import('./panel-mes/panel-mes-routing.module').then(m => m.PanelMesRoutingModule)
  },
  {
    path: '**',
    redirectTo: '/inicio'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
