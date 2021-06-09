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
    const headers = new HttpHeaders({
      // 'Access-Control-Allow-Origin': '*'
    });
    return headers;
  }

  // All request
  request(method: string, serviceName: string, body: any) {
    return this._http[method](environment.serverUrl + serviceName, body, this.getHeaders()).pipe(
      map((response: any) => {
        console.log("response", response);
        // Validar datos
        let valData = this.valData(0, { x: response });
        if (valData.is) {
          return { valid: true, print: response };
        } else {
          return { valid: false, print: valData.msg };
        }
      })
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
  public set session(value) {
    localStorage.setItem('session', JSON.stringify(value));
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
      backdropDismiss:  false
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

  async dismissLoading() {
    if (this.loading) {
      await this.loading.create.dismiss();
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

  isError(resData: any, errorName: string): any {
    // Validar datos de JSON, Error...
    if (this.isJsonString(JSON.stringify(resData))) {
      if (resData == null || resData == undefined) {
        return { is: false, msg: 'Answer with error' };
      } else if (resData instanceof Array) {
        return { is: true, msg: 'Ok Array' };
      } else if (resData.hasOwnProperty('codigo')) {
        if (resData.codigo != 0) {
          return { is: false, msg: resData.msg };
        } else {
          return { is: true, msg: 'Ok Value' };
        }
      } else {
        return { is: true, msg: 'Ok Value' };
      }
    } else {
      return { is: false, msg: 'Invalid json response' };
    }
  }

  valData(type: number, params: any): any {
    switch (type) {
      case 0:
        // Default
        return this.isError(params.x, 'Error');
      case 1:
        return this.isError(params.x, params.y);
      default:
        return {
          is: false,
          msg: 'Invalid parameter type:(' + type + ') in valData'
        };
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.log(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log(message: string) {
    // console.log(`ClassroomService: ${message}`);
  }
}
