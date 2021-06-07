import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {

  constructor(private _router: Router, private _appService: AppService) { }

  canActivate() {
    console.log('HomeGuard');
    try {
      const session = this._appService.session;
      if (session) {
        if (session.hasOwnProperty('rol')) {
          switch (session.rol) {
            case 0:
            case 1:
            case 2:
            case 3:
              return true;
              break;
            default:
              return this._router.navigateByUrl('/login');
              break;
          }
        } else {
          return this._router.navigateByUrl('/login');
        }
      } else {
        return this._router.navigateByUrl('/login');
      }
    } catch (error) {
      console.log('guard home error:', error);
      return this._router.navigateByUrl('/login');
    }
  }

}
