import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatListModule,
  MatSelectModule,
  MatButtonToggleModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatSelectModule,
    MatButtonToggleModule,
    CommonModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatSelectModule,
    MatButtonToggleModule
  ],
  declarations: []
})
export class MaterialModule { }
