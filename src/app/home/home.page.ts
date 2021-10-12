import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private _menu: MenuController, public _appService: AppService) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this._menu.enable(true, 'menu');
    this._appService.presentLoading('load-survey', 'circular', 'Cargando...', true, 0);
    this._appService.request('get', '/home').subscribe(data => {
      this._appService.dismissLoading();
      if (data.valid) {
        let data_home = data.print;
        if (!data_home.hasOwnProperty('fecha_encuesta')) {
          data_home = Object.assign(data_home, { fecha_encuesta: false });
        }
        this._appService.session = Object.assign(this._appService.session, data_home);
      } else {
        // this._appService.presentAlert('alert-error', null, '¡Ups! algo no salio bien, intentelo de nuevo mas tarde.', null, 'Aceptar');
      }
    });
  }

  openMenu() {
    this._menu.open('menu');
  }

  closeMenu() {
    this._menu.close('menu');
  }

}
