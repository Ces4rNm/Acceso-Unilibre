import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QRExitPageRoutingModule } from './qr-exit-routing.module';

import { QRExitPage } from './qr-exit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRExitPageRoutingModule
  ],
  declarations: [QRExitPage]
})
export class QRExitPageModule {}
