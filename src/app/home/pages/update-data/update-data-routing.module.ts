import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateDataPage } from './update-data.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateDataPageRoutingModule {}
