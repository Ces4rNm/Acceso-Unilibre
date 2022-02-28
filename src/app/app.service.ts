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

  platformIs: string;

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
      }),
      catchError(this.handleError<any>(serviceName, { valid: false }))
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
      catchError(this.handleError<any>(serviceName, { valid: false }))
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
    // Set sidebar options
    const { rol } = value;
    if (rol >= 0 && environment.rolRoute && rol < environment.rolRoute.length) {
      this.options = environment.rolRoute[rol];
    } else {
      localStorage.clear();
      this._router.navigate(['/login']);
    }
  }

  // Alert
  async ionAlert(cssClass, header, subHeader, message, buttons, cssClassbuttons = '') {
    return await this._alertController.create({
      cssClass: cssClass,
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: [{ text: buttons, cssClass: cssClassbuttons }],
      backdropDismiss: false
    }).then(a => {
      a.present().then(() => {
        a.onDidDismiss();
      });
    });
  }


  // Loading
  isLoading = false;
  async ionLoading(cssClass, spinner, message, showBackdrop, duration = 0) {
    this.isLoading = true;
    return await this._loadingController.create({
      cssClass: cssClass, // string | string[] | undefined
      spinner: spinner,// "bubbles" | "circles" | "circular" | "crescent" | "dots" | "lines" | "lines-small" | null | undefined
      message: message,// IonicSafeString | string | undefined
      showBackdrop: showBackdrop,// boolean
      duration: duration //number
    }).then(l => {
      l.present().then(() => {
        if (!this.isLoading) {
          l.dismiss();
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this._loadingController.dismiss();
  }

  // Data temp
  temp: Array<any> = [
    {
      documento: 1143461705,
      nombre: 'Juan Perez',
      tipo: 1,
      numero: 3005932413,
      correo: 'juan@mail.com'
    },
    {
      documento: 1143461702,
      nombre: 'Daniela Mariño',
      tipo: 1,
      numero: 3235932413,
      correo: 'Daniela@mail.com'
    },
    {
      documento: 1143461703,
      nombre: 'David Lopez',
      tipo: 0,
      numero: 3235932413,
      correo: 'David@mail.com'
    },
    {
      documento: 1143461704,
      nombre: 'Julia Bozon',
      tipo: -1,
      numero: 3235932413,
      correo: 'Julia@mail.com'
    },
    {
      documento: 1143461705,
      nombre: 'Felipe Cuadrado',
      tipo: 1,
      numero: 3235732413,
      correo: 'Felipe@mail.com'
    },
    {
      documento: 1143461706,
      nombre: 'Alejandro Romero',
      tipo: 0,
      numero: 3235962413,
      correo: 'Alejandro@mail.com'
    },
    {
      documento: 1143461708,
      nombre: 'Diana Vargas',
      tipo: -1,
      numero: 3235932433,
      correo: 'Diana@mail.com'
    }
  ];

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
      if (error) {
        const { codigo, msg } = error;
        if (codigo == -3 && status == 403) {
          this._router.navigate(['/login']);
        } else if (msg && (status == 500 || status == 400)) {
          result = Object.assign(result, { msg: msg });
        }
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
