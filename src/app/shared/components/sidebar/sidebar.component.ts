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

  options: Array<any> = [];

  darkMode: boolean;

  prefersDark: any;

  constructor(public _menu: MenuController, private _router: Router, public _appService: AppService) {
    if (this._appService.session.hasOwnProperty('rol')) {
      switch (this._appService.session.rol) {
        case 0:
          this.options = [
            {
              name: 'Inicio',
              url: '/home',
              icon: 'home'
            },
            {
              name: 'Actualizar Datos',
              url: '/home/update-data',
              icon: 'person-circle'
            },
            {
              name: 'Permitir Acceso',
              url: '/home/qr-scan',
              icon: 'key'
            },
            {
              name: 'Listado de Registros',
              url: '/soporte',
              icon: 'medkit'
            },
            {
              name: 'Administrar Datos',
              url: '/soporte',
              icon: 'bar-chart'
            },
          ];
          break;
        case 1:
          this.options = [
            {
              name: 'Inicio',
              url: '/home',
              icon: 'home'
            },
            {
              name: 'Actualizar Datos',
              url: '/home/update-data',
              icon: 'person-circle'
            },
            {
              name: 'Permitir Acceso',
              url: '/home/qr-scan',
              icon: 'key'
            },
            {
              name: 'Registros de Usuarios',
              url: '/soporte',
              icon: 'medkit'
            },
          ];
          break;
        case 2:
          this.options = [
            {
              name: 'Inicio',
              url: '/home',
              icon: 'home'
            },
            {
              name: 'Actualizar Datos',
              url: '/home/update-data',
              icon: 'person-circle'
            },
            {
              name: 'Permitir Acceso',
              url: '/home/qr-scan',
              icon: 'key'
            },
          ];
          break;
        case 3:
          this.options = [
            {
              name: 'Inicio',
              url: '/home',
              icon: 'home'
            },
            {
              name: 'Actualizar Datos',
              url: '/home/update-data',
              icon: 'person-circle'
            },
          ];
          break;
        default:
          this._appService.presentAlert('alert-error', null, 'El rol del usuario esta indefinido', null, 'Aceptar');
          localStorage.clear();
          this._router.navigate(['/login']);
          break;
      }
    } else {

    }


    // this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    // this.darkMode = this.prefersDark.matches;
    // if (this.prefersDark.matches) {
    //   document.body.classList.add('dark');
    // } else {
    //   document.body.classList.remove('dark');
    // }

    // this.prefersDark.addEventListener('change', function (e) {
    //   if (e.matches) {
    //     document.body.classList.add('dark');
    //     this.darkMode = true;
    //   } else {
    //     document.body.classList.remove('dark');
    //     this.darkMode = false;
    //   }
    //   console.log(e.matches, this.darkMode);
    // });
  }

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
    this._menu.enable(true, 'menu');
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
