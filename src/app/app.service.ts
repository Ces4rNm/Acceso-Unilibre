import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _route: ActivatedRoute,
    public _alertController: AlertController,
    public _loadingController: LoadingController
  ) { }

  getHeaders(): any {
    const session = this.session;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': (session && session.hasOwnProperty('token')) ? session.token : ''
    });
    return { headers: headers };
  }

  // All request with body
  requestSendBody(method: string, serviceName: string, body: any) {
    console.log("🚩", method, serviceName, body)
    return this._http[method](environment.serverUrl + serviceName, body, this.getHeaders()).pipe(
      map((response: any) => {
        console.log("response", response);
        // Validar datos
        let valData = this.valData(0, response);
        if (valData.is) {
          return { valid: true, print: response.data, codigo: response.codigo, msg: response.msg };
        } else {
          return { valid: false, print: response, msg: valData.msg };
        }
      })
    );
  }

  // All request without body
  request(method: string, serviceName: string) {
    console.log("🚩", method, serviceName)
    return this._http[method](environment.serverUrl + serviceName, this.getHeaders()).pipe(
      map((response: any) => {
        console.log("response", response);
        // Validar datos
        let valData = this.valData(0, response);
        if (valData.is) {
          return { valid: true, print: response.data, codigo: response.codigo, msg: response.msg };
        } else {
          return { valid: false, print: response, msg: valData.msg };
        }
      }),
      catchError(this.handleError<any>(serviceName, []))
    );
  }

  // Session
  public get session() {
    try {
      let session = JSON.parse(localStorage.getItem('session'));
      if (session) {
        return session;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  options: Array<any> = [];
  public set session(value: any) {
    localStorage.setItem('session', JSON.stringify(value));
    const { rol } = value;
    if (rol >= 0 && environment.rolRoute && rol < environment.rolRoute.length) {
      this.options = environment.rolRoute[rol];
    } else {
      localStorage.clear();
      this._router.navigate(['/login']);
    }
  }

  // Alert
  alert: any = {
    create: null,
    role: null
  }
  async presentAlert(cssClass, header, subHeader, message, buttons, cssClassbuttons = '') {
    this.alert.create = await this._alertController.create({
      cssClass: cssClass,
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: [{ text: buttons, cssClass: cssClassbuttons }],
      backdropDismiss: false
    });

    await this.alert.create.present();

    this.alert.role = await this.alert.create.onDidDismiss();
    // console.log('onDidDismiss resolved with role', this.alert.role);
  }

  // Loading
  loading: any = {
    create: null,
    role: null
  };
  async presentLoading(cssClass, spinner, message, showBackdrop, duration = 0) {
    this.loading.create = await this._loadingController.create({
      cssClass: cssClass, // string | string[] | undefined
      spinner: spinner,// "bubbles" | "circles" | "circular" | "crescent" | "dots" | "lines" | "lines-small" | null | undefined
      message: message,// IonicSafeString | string | undefined
      showBackdrop: showBackdrop,// boolean
      duration: duration //number
    });
    await this.loading.create.present();

    this.loading.role = await this.loading.create.onDidDismiss();
    // console.log('Loading dismissed!', this.loading.role);
  }

  dismissLoading() {
    if (this.loading) {
      setTimeout(() => {
        this.loading.create.dismiss();
      }, 10);
    }
  }

  isJsonString(strJson: string): boolean {
    // Validar JSON
    try {
      JSON.parse(strJson);
    } catch (e) {
      return false;
    }
    return true;
  }

  isError(resData: any): any {
    // Validar datos de JSON, Error...
    if (this.isJsonString(JSON.stringify(resData))) {
      if (resData == null || resData == undefined) {
        return { is: false, msg: 'Respond with null or undefined' };
      } else if (resData.hasOwnProperty('codigo')) {
        if (resData.codigo > 0) {
          if (resData.hasOwnProperty('data')) {
            return { is: true, msg: 'Ok Value' };
          } else {
            return { is: false, msg: 'Response does not contain the [data] property' };
          }
        } else {
          return { is: false, msg: resData.msg };
        }
      } else {
        return { is: false, msg: 'Response does not contain the [codigo] property' };
      }
    } else {
      return { is: false, msg: 'Response does not contain a valid json' };
    }
  }

  valData(type: number, params: any): any {
    switch (type) {
      case 0:
        // Default
        return this.isError(params);
      default:
        return {
          is: false,
          msg: 'Invalid parameter type:(' + type + ') in valData'
        };
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (response: any): Observable<T> => {
      // TODO: send the response to remote logging infrastructure
      // console.log(response); // log to console instead
      const { error, status } = response;
      if ((error.hasOwnProperty('codigo') && error.codigo == -3) || status == 403) {
        this._router.navigate(['/login']);
      }
      // TODO: better job of transforming response for user consumption
      this.log(`${operation} failed: ${response.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log(message: string) {
    // console.log(`AppService: ${message}`);
  }
}
