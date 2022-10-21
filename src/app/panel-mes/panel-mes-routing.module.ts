import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelMesComponent } from './panel-mes.component';

const routes: Routes = [
  {
    path: '', component: PanelMesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelMesRoutingModule { }
