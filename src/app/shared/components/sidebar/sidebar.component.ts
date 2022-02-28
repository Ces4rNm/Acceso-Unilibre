import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  darkMode: boolean;

  prefersDark: any;

  constructor(
    public _menu: MenuController,
    private _router: Router,
    public _appService: AppService
  ) { }

  change() {
    this.darkMode = !this.darkMode;
    console.log('toggle', this.darkMode);
    if (this.darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  ngOnInit() { }

  openMenu() {
    // this._menu.enable(true, 'menu');
    this._menu.open('menu');
  }

  closeMenu() {
    this._menu.close('menu');
  }

  logout() {
    localStorage.clear();
    this._router.navigate(['/tourt']);
  }

}
