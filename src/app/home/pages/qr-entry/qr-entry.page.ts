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

  constructor(
    private _router: Router,
    public _appService: AppService
  ) {

    if (this._appService.session.id_encuesta && this._appService.session.fecha_encuesta && this._appService.session.id) {
      const structure = {
        survey: {
          d: this._appService.session.fecha_encuesta,// Date survey
          c: this._appService.session.id_encuesta,// Code survey
          t: 1,// Type survey
          n:this._appService.session.nombre,// Name user
          i: this._appService.session.documento// Id user
        }
        // exit: {
        //   c: 1,// Code sede
        // }
      }
      this.createCode = JSON.stringify(structure);
    } else {
      this._router.navigate(['/login']);
      this._appService.presentAlert('alert-error', null, 'Datos del usuario invalidos', null, 'Aceptar');
    }

  }

  showDetail() {
    this._appService.presentAlert(
      'alert-info min-w-30 text-left',
      null,
      'Resultados:',
      'No presenta síntomas ni factores de riesgo asociados al Covid-19.',
      'Aceptar'
    );
  }

}
