import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrEntryPageRoutingModule } from './qr-entry-routing.module';

import { QrEntryPage } from './qr-entry.page';

import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrEntryPageRoutingModule,
    NgxQRCodeModule,
    SharedModule
  ],
  declarations: [QrEntryPage]
})
export class QrEntryPageModule {}
