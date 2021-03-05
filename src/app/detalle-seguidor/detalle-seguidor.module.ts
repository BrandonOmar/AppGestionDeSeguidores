import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleSeguidorPageRoutingModule } from './detalle-seguidor-routing.module';

import { DetalleSeguidorPage } from './detalle-seguidor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleSeguidorPageRoutingModule
  ],
  declarations: [DetalleSeguidorPage]
})
export class DetalleSeguidorPageModule {}
