import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QRScanPage } from './qr-scan.page';

const routes: Routes = [
  {
    path: '',
    component: QRScanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QRScanPageRoutingModule {}
