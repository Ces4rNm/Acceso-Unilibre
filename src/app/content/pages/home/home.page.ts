import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ContentService } from '../../content.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public _appService: AppService,
    public _contentService: ContentService
  ) {
    this._contentService.title = 'Acceso Unilibre';
  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    // this._appService.ionLoading('load-survey', 'circular', 'Cargando...', true, 0);
    // this._appService.request('get', '/home').subscribe(data => {
    //   this._appService.dismiss();
    //   if (data.valid) {
    //     const { fecha_encuesta } = data.print;
    //     let data_home = data.print;
    //     if (!fecha_encuesta) {
    //       data_home = Object.assign(data_home, { fecha_encuesta: false });
    //     }
    //     this._appService.session = Object.assign(this._appService.session, data_home);
    //   } else {
    //     this._appService.ionAlert('alert-error', null, data.msg, null, 'Aceptar');
    //   }
    // });
  }

}
