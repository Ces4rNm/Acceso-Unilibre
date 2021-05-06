import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'tourt', pathMatch: 'full' },
  { path: '**', redirectTo: 'tourt' },
  {
    path: 'tourt',
    loadChildren: () => import('./tourt/tourt.module').then(m => m.TourtPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./report/report.module').then(m => m.ReportPageModule)
  },
  {
    path: 'qr-entry',
    loadChildren: () => import('./qr-entry/qr-entry.module').then(m => m.QREntryPageModule)
  },
  {
    path: 'qr-scan',
    loadChildren: () => import('./qr-scan/qr-scan.module').then(m => m.QRScanPageModule)
  },
  {
    path: 'qr-exit',
    loadChildren: () => import('./qr-exit/qr-exit.module').then(m => m.QRExitPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
