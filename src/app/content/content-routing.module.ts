import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentPage } from './content.page';

const routes: Routes = [
  {
    path: '',
    component: ContentPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
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
        path: 'update-data',
        loadChildren: () => import('./pages/update-data/update-data.module').then(m => m.UpdateDataPageModule)
      },
      {
        path: 'survey-list',
        loadChildren: () => import('./pages/survey-list/survey-list.module').then(m => m.SurveyListPageModule)
      },
      {
        path: 'survey-chart',
        loadChildren: () => import('./pages/survey-chart/survey-chart.module').then(m => m.SurveyChartPageModule)
      },
      {
        path: 'role-permissions',
        loadChildren: () => import('./pages/role-permissions/role-permissions.module').then(m => m.RolePermissionsPageModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
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
export class ContentPageRoutingModule {}
