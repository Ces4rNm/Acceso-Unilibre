import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class ChildGuard implements CanActivate {

  constructor(private _router: Router, private _appService: AppService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // this._appService.options.find(item => item.rol==0)
    console.log(ActivatedRouteSnapshot, RouterStateSnapshot);
    return true;
  }

}
