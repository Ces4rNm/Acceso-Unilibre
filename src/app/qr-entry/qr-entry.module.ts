import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QREntryPageRoutingModule } from './qr-entry-routing.module';

import { QREntryPage } from './qr-entry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QREntryPageRoutingModule
  ],
  declarations: [QREntryPage]
})
export class QREntryPageModule {}
