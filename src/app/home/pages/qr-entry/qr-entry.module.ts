import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrEntryPageRoutingModule } from './qr-entry-routing.module';

import { QrEntryPage } from './qr-entry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrEntryPageRoutingModule
  ],
  declarations: [QrEntryPage]
})
export class QrEntryPageModule {}
