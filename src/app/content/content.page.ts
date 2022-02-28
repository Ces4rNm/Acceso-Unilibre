import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AppService } from '../app.service';
import { ContentService } from './content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
})
export class ContentPage implements OnInit {
  constructor(
    private _menu: MenuController,
    public _appService: AppService,
    public _contentService: ContentService
  ) { }

  ngOnInit() {
    this._appService.ionLoading('load-survey', 'circular', 'Cargando...', true, 0);
    this._appService.request('get', '/home').subscribe(data => {
      this._appService.dismiss();
      if (data.valid) {
        const { fecha_encuesta } = data.print;
        let data_home = data.print;
        if (!fecha_encuesta) {
          data_home = Object.assign(data_home, { fecha_encuesta: false });
        }
        this._appService.session = Object.assign(this._appService.session, data_home);
      } else {
        this._appService.ionAlert('alert-error', null, data.msg, null, 'Aceptar');
      }
    });
  }

  ionViewWillEnter() {
    // this._menu.enable(true, 'menu');
  }

  openMenu() {
    this._menu.open('menu');
  }

  closeMenu() {
    this._menu.close('menu');
  }

}
