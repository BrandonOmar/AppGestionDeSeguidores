import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


import { AdministradorPageRoutingModule } from './administrador-routing.module';

import { AdministradorPage } from './administrador.page';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    PipesModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AdministradorPageRoutingModule
  ],
  declarations: [AdministradorPage]
})
export class AdministradorPageModule {}