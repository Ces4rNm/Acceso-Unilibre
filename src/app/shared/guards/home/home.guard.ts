import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {

  constructor(private _router: Router, private _appService: AppService) { }

  canActivate() {
    try {
      const { rol } = this._appService.session;
      if (rol >= 0) {
        return true;
      }
      return this._router.navigateByUrl('/login');
    } catch (error) {
      console.log('guard home error:', error);
      return this._router.navigateByUrl('/login');
    }
  }

}
