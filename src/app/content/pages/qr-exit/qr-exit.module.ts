import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrExitPageRoutingModule } from './qr-exit-routing.module';

import { QrExitPage } from './qr-exit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrExitPageRoutingModule
  ],
  declarations: [QrExitPage]
})
export class QrExitPageModule {}
