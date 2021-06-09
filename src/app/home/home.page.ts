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
    console.log(this._appService.session);
    this._menu.enable(true, 'menu');
  }

  openMenu() {
    this._menu.open('menu');
  }

  closeMenu() {
    this._menu.close('menu');
  }
  
}
