import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrExitPage } from './qr-exit.page';

const routes: Routes = [
  {
    path: '',
    component: QrExitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrExitPageRoutingModule {}
