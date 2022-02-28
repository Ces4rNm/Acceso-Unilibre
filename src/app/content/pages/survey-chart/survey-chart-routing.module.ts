import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyChartPage } from './survey-chart.page';

const routes: Routes = [
  {
    path: '',
    component: SurveyChartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyChartPageRoutingModule {}
