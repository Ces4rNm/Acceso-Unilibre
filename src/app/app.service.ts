import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  urlBase: string = '';
  urlRelative: string = this.urlBase + '';

  token: string = '';

  userData: any;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _activateRoute: ActivatedRoute,
  ) { }

  getHeaders(): any {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    })
    return ({ headers: headers });
  }

  post(url: any, formData: FormData) {
    return this._http.post(url, formData, this.getHeaders());
  }

  login(email, pass): Observable<any> {
    return this._http.get(this.urlRelative + `/userData.json?email=${email}&pass=${pass}`, this.getHeaders()).pipe(
      map((data: any) => {
        // Validar datos
        let valData = this.valData(0, { x: data });
        if (!valData.isError) {
          if (data.code = 0) {
            this.userData = data;
            return { valid: true, print: data.data.User };
          } else {
            return { valid: false, print: 'Response does not contain the parameter:User' };
          }
        } else {
          return { valid: false, print: valData.msgError };
        }
      }),
      catchError(this.handleError<any>('getUserData', []))
    );
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

  isError(resData: any): boolean {
    return resData.hasOwnProperty('data') && resData.data.hasOwnProperty('Error');
  }

  valData(type: number, params: any): any {
    // Validar datos de JSON, Error...
    switch (type) {
      case 0:
        // Validar datos
        if (this.isJsonString(JSON.stringify(params.x))) {
          let res = true;
          if (params.x) {
            res = false;
          }
          let error = this.isError(params.x);
          return {
            isError: error || res,
            msgError: error ? 'Answer with error' : ((res) ? 'Response empty:' + params.x : '')
          };
        } else {
          return {
            isError: true,
            msgError: 'Invalid json response'
          };
        }
      case 1:
        // Validar datos con un parametro extra de respuesta
        if (this.isJsonString(JSON.stringify(params.x))) {
          let res = true;
          if (params.x && params.x.hasOwnProperty(params.y)) {
            res = false;
          }
          let error = this.isError(params.x);
          return {
            isError: error || res,
            msgError: error ? 'Answer with error' : ((res) ? 'Response does not contain the parameter:' + params.y : '')
          };
        } else {
          return {
            isError: true,
            msgError: 'Invalid json response'
          };
        }
      default:
        return {
          isError: true,
          msgError: 'Invalid parameter (type) in valData'
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
