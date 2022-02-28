import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateDataPageRoutingModule } from './update-data-routing.module';

import { UpdateDataPage } from './update-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateDataPageRoutingModule
  ],
  declarations: [UpdateDataPage]
})
export class UpdateDataPageModule {}
