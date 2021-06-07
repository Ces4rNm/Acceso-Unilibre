import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeGuard } from './shared/guards/home/home.guard';
import { TourtGuard } from './shared/guards/tourt/tourt.guard';

const routes: Routes = [
  { path: '', redirectTo: 'tourt', pathMatch: 'full' },
  {
    path: 'tourt',
    loadChildren: () => import('./tourt/tourt.module').then(m => m.TourtPageModule),
    canActivate: [TourtGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [HomeGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'password',
    loadChildren: () => import('./password/password.module').then(m => m.PasswordPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
