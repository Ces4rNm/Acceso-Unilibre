import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = "user@mail.com";
  password: string = "abc";

  loading: boolean;

  constructor(
    private _router: Router,
    public _appService: AppService
  ) { }

  ngOnInit() { }

  login(data) {
    if (data.form.status == 'VALID') {
      if (data.form.value.email && data.form.value.password) {
        let body = {
          correo: data.form.value.email,
          clave: data.form.value.password
        }
        this.loading = true;
        this._appService.requestSendBody('post', '/login', body).subscribe(data => {
          if (data.valid) {
            let session = data.print;
            this._appService.session = session;
            if (session.hasOwnProperty('rol')) {
              this._router.navigate(['/home']);
            } else {
              this._router.navigate(['/login']);
            }
          } else {
            localStorage.clear();
            this._appService.presentAlert('alert-error', null, data.print, null, 'Aceptar');
          }
          this.loading = false;
        });
      } else {
        this._appService.presentAlert('alert-error', null, 'Datos vacios en las credenciales', 'Documento o Correo: <br> ' + data.form.value.email + ' <br> <br> Contraseña: <br> ' + data.form.value.password, 'Aceptar');
      }
    } else {
      this._appService.presentAlert('alert-error', null, 'Datos vacios en las credenciales', 'Documento o Correo: <br> ' + data.form.value.email + ' <br> <br> Contraseña: <br> ' + data.form.value.password, 'Aceptar');
    }
  }
}
