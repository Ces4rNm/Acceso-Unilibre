import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class TourtGuard implements CanActivate {

  constructor(private _router: Router, private _appService: AppService) { }

  canActivate() {
    try {
      const session = this._appService.session;
      if (session) {
        if (session.hasOwnProperty('rol')) {
          switch (session.rol) {
            case 0:
            case 1:
            case 2:
            case 3:
              return this._router.navigateByUrl('/content');;
              break;
            default:
              return this._router.navigateByUrl('/login');
              break;
          }
        } else {
          return this._router.navigateByUrl('/login');
        }
      } else {
        return true;
      }
    } catch (error) {
      console.log('guard tourt error:', error);
      return true;
    }
  }

}
