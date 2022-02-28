import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurveyChartPageRoutingModule } from './survey-chart-routing.module';

import { SurveyChartPage } from './survey-chart.page';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SurveyChartPageRoutingModule,
    HighchartsChartModule
  ],
  declarations: [SurveyChartPage]
})
export class SurveyChartPageModule {}
