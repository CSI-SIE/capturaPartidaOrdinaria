import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelAdminRoutingModule } from './panel-admin-rounting.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MaterialModule } from '../shered/material/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    PanelAdminRoutingModule,
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
    MatSnackBarModule
  ]
})
export class PanelAdminModule { }
