import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'survey',
    loadChildren: () => import('./pages/survey/survey.module').then(m => m.SurveyPageModule)
  },
  {
    path: 'qr-entry',
    loadChildren: () => import('./pages/qr-entry/qr-entry.module').then(m => m.QrEntryPageModule)
  },
  {
    path: 'qr-scan',
    loadChildren: () => import('./pages/qr-scan/qr-scan.module').then(m => m.QrScanPageModule)
  },
  {
    path: 'qr-exit',
    loadChildren: () => import('./pages/qr-exit/qr-exit.module').then(m => m.QrExitPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('../not-found/not-found.module').then(m => m.NotFoundPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
