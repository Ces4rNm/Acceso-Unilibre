import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TourtPage } from './tourt.page';

const routes: Routes = [
  {
    path: '',
    component: TourtPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TourtPageRoutingModule {}
