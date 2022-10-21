import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SesionSIERoutingModule } from './sesion-sie-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SesionSIERoutingModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class SesionSieModule { }
