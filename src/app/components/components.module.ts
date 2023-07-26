import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms' ;

import { NgChartsModule } from 'ng2-charts';

import { DonaComponent } from './dona/dona.component';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { ModalImagesComponent } from './modal-images/modal-images.component';




@NgModule({
  declarations: [
    DonaComponent,
    IncrementadorComponent,
    ModalImagesComponent
  ],
  exports: [
    DonaComponent,
    IncrementadorComponent,
    ModalImagesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ]
})
export class ComponentsModule { }
