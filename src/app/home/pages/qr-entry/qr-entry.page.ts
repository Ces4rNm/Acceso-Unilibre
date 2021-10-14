import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-qr-entry',
  templateUrl: './qr-entry.page.html',
  styleUrls: ['./qr-entry.page.scss'],
})
export class QrEntryPage {

  createCode: string = '';
  typeSurveyClass: string = '';

  constructor(
    private _router: Router,
    public _appService: AppService
  ) {
    if (this._appService.session.id_registro && this._appService.session.fecha_encuesta && this._appService.session.analisis_encuesta.tipo >= -1 && this._appService.session.id) {
      const structure = {
        survey: {
          d: this._appService.session.fecha_encuesta,// Date survey
          c: this._appService.session.id_registro,// Code survey
          t: this._appService.session.analisis_encuesta.tipo,// Type survey
          n: this._appService.session.nombre,// Name user
          i: this._appService.session.documento// Id user
        }
        // exit: {
        //   c: 1,// Code sede
        // }
      }
      switch (this._appService.session.analisis_encuesta.tipo) {
        case 1:
          this.typeSurveyClass = 'qr-success';
          break;
        case 0:
          this.typeSurveyClass = 'qr-warning';
          break;
        case -1:
          this.typeSurveyClass = 'qr-danger';
          break;
        default:
          this.typeSurveyClass = 'qr-warning';
          this._router.navigate(['/login']);
          this._appService.ionAlert('alert-error', null, 'Dato [analisis_encuesta.tipo] invalido', null, 'Aceptar');
          break;
      }
      this.createCode = JSON.stringify(structure);
    } else {
      this._router.navigate(['/login']);
      this._appService.ionAlert('alert-error', null, 'Datos del usuario invalidos', null, 'Aceptar');
    }

  }

  showDetail() {
    this._appService.ionAlert(
      'alert-info min-w-30 text-left',
      null,
      'Resultados:',
      this._appService.session.analisis_encuesta.resultados,
      'Aceptar'
    );
  }

}
