import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QRExitPage } from './qr-exit.page';

const routes: Routes = [
  {
    path: '',
    component: QRExitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QRExitPageRoutingModule {}
