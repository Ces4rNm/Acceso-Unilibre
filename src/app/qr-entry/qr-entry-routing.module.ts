import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QREntryPage } from './qr-entry.page';

const routes: Routes = [
  {
    path: '',
    component: QREntryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QREntryPageRoutingModule {}
