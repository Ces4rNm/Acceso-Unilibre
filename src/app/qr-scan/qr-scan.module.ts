import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QRScanPageRoutingModule } from './qr-scan-routing.module';

import { QRScanPage } from './qr-scan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRScanPageRoutingModule
  ],
  declarations: [QRScanPage]
})
export class QRScanPageModule {}
