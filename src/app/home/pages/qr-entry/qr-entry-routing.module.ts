import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrEntryPage } from './qr-entry.page';

const routes: Routes = [
  {
    path: '',
    component: QrEntryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrEntryPageRoutingModule {}
