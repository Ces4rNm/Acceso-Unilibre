import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.page.html',
  styleUrls: ['./update-data.page.scss'],
})
export class UpdateDataPage implements OnInit {

  loading: boolean;

  user: any = {
    id: 0,
    titulo: 'El titulo del formulario.',
    desc: 'Después de llenar los datos, al correo electrónico ingresado le llegaran las credenciales de acceso.',
    preguntas: [
      {
        id: 0,
        tipo: 0,
        val: 'Cesar Alejandro',
        titulo: "Nombres:",
        respuestas: '',
        obligatorio: true,
      },
      {
        id: 0,
        tipo: 0,
        val: 'Nuñez Mariño',
        titulo: "Apellidos:",
        respuestas: '',
        obligatorio: true,
      },
      {
        id: 0,
        tipo: 3,
        val: '1',
        titulo: "Tipo de documento:",
        respuestas: [
          { id: 1, texto: 'CC' },
          { id: 2, texto: 'TI' },
        ],
        obligatorio: true,
      },
      {
        id: 0,
        tipo: 0,
        val: '1001',
        titulo: "Documento:",
        respuestas: '',
        obligatorio: true,
      },
      {
        id: 0,
        tipo: 3,
        val: '',
        titulo: "Genero:",
        respuestas: [
          { id: 1, texto: 'Masculino' },
          { id: 2, texto: 'Femenino' },
          { id: 3, texto: 'Otro' },
        ],
        obligatorio: true,
      },
      // {
      //   id: 2,
      //   tipo: 1,
      //   val: '',
      //   titulo: "El medio de transporte habitual que utilizas para llegar a las instalaciones de la Universidad Libre:",
      //   respuestas: [
      //     { id: 1, texto: 'En transporte público masivo: Transmetro, Transmilenio…' },
      //     { id: 2, texto: 'En bus público' },
      //     { id: 3, texto: 'En taxi público' },
      //     { id: 4, texto: 'En el vehículo familiar/amigo' },
      //     { id: 5, texto: 'En mi propio vehículo/bicicleta/caminando' },
      //   ],
      //   obligatorio: true,
      // },
      // {
      //   id: 3,
      //   tipo: 1,
      //   val: '',
      //   titulo: "¿Ya recibió la vacuna contra el COVID-19?",
      //   respuestas: [
      //     { id: 1, texto: 'Si, la primera dosis' },
      //     { id: 2, texto: 'Si, la primera y segunda dosis' },
      //     { id: 3, texto: 'No' },
      //   ],
      //   obligatorio: true,
      // },
      // {
      //   id: 4,
      //   tipo: 0,
      //   val: '',
      //   titulo: "Describa como te sientes al ingresar a la universidad de forma presencial en pandemia:",
      //   respuestas: '',
      //   obligatorio: false,
      // }
    ]
  };

  constructor(public _appService: AppService, private _router: Router) { }

  ngOnInit() {
  }

  sendUser(data) {
    if (data.form.value) {
      let error = [];
      let preguntas = [];
      Object.entries(data.form.value).forEach(([key, value]) => {
        // console.log(key + ' ' + value);
        let index = key.split('-')[1];
        let type = key.split('-')[0];
        preguntas.push({ index: index, value: value });
        if (this.user.preguntas[index].obligatorio) {
          switch (type) {
            case 'text':
            case 'textarea':
              if (value.toString().trim().length == 0) {
                error.push('La respuesta #' + (parseInt(index) + 1) + ' no es valida');
              }
              break;
            case 'radio':
              if (value.toString().trim().length == 0) {
                error.push('La respuesta #' + (parseInt(index) + 1) + ' esta vacía');
              }
              break;
            case 'checkbox':
              if (value instanceof Array) {
                if (value.length == 0) {
                  error.push('La respuesta #' + (parseInt(index) + 1) + ' esta vacía []');
                }
              } else {
                error.push('La respuesta #' + (parseInt(index) + 1) + ' no es un Array' + value);
              }
              break;
            default:
              error.push('Tipo de pregunta indefinida #' + (parseInt(index) + 1));
              break;
          }
        }
      });
      if (error.length == 0) {
        if (data.form.status == 'VALID') {
          if (this.user && preguntas.length > 0) {
            this.loading = true;
            let body = {
              user_id: this._appService.session.id,
              encuesta_id: this.user.id,
              preguntas: preguntas.map((pregunta) => {
                return {
                  id: this.user.preguntas[pregunta.index].id,
                  tipo: this.user.preguntas[pregunta.index].tipo,
                  respuesta: (pregunta.value instanceof Array) ? pregunta.value.join(',') : pregunta.value
                }
              })
            };
            console.log(body);
            this._router.navigate(['/login']);
            // this._appService.request('post', '/survey', body).subscribe(data => {
            //   console.log(data);
            //   if (data.valid) {
            //     if (data.print.codigo == 0) {
            //       let update = this._appService.session;
            //       update.fecha_encuesta = data.print.fecha_registro;
            //       this._appService.session = update;
            //       this._router.navigate(['/home']);
            //     } else {
            //       this._appService.presentAlert('alert-error', null, data.print, null, 'Aceptar');
            //     }
            //   } else {
            //     this._appService.presentAlert('alert-error', null, data.print, null, 'Aceptar');
            //   }
            //   this.loading = false;
            // });
          } else {
            this.loading = false;
          }
        } else {
          this._appService.presentAlert(
            'alert-error',
            null,
            'Encuesta invalida',
            'Ingrese todos los campos obligatorios*',
            'Aceptar'
          );
        }
      } else {
        this._appService.presentAlert(
          'alert-error',
          null,
          'Encuesta invalida:',
          error.join(' <br><br> '),
          'Aceptar'
        );
      }
    } else {
      this._appService.presentAlert(
        'alert-error',
        null,
        'Encuesta invalida',
        'Ingrese todos los campos obligatorios*',
        'Aceptar'
      );
    }
  }

  addCheckbox(event, checkbox, index, data) {
    data.controls['checkbox-' + index].setErrors(null);
    if (event.detail.checked) {
      this.user.preguntas[index].val.push(checkbox.id);
    } else {
      this.user.preguntas[index].val = this.user.preguntas[index].val.filter((item) => {
        return item != checkbox.id;
      });
    }
  }

}
