import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  loading: boolean;

  user: any = {
    id: 0,
    titulo: 'Ingrese los siguientes datos:',
    desc: 'Después de llenar los datos, al correo electrónico ingresado le llegaran las credenciales de acceso.',
    preguntas: [
      // {
      //   id: 1,
      //   tipo: 3,
      //   val: 'CC',
      //   pro: 'tipo_documento',
      //   titulo: "Tipo de documento:",
      //   respuestas: [
      //     { id: 'CC', texto: 'Cédula de ciudadanía' },
      //     { id: 'TI', texto: 'Tarjeta de identidad' },
      //     { id: 'NI', texto: 'NIT' },
      //     { id: 'PA', texto: 'Pasaporte ' },
      //     { id: 'TX', texto: 'Tipo de documento extranjero' },
      //   ],
      //   obligatorio: true,
      // },
      {
        id: 2,
        tipo: 0,
        val: '1143461706',
        pro: 'documento',
        input: 'number',
        titulo: "Documento:",
        respuestas: '',
        obligatorio: true,
      },
      {
        id: 3,
        tipo: 0,
        val: 'Cesar',
        pro: 'nombre',
        input: 'text',
        titulo: "Nombre:",
        respuestas: '',
        obligatorio: true,
      },
      // {
      //   id: 4,
      //   tipo: 0,
      //   val: 'Alejandro',
      //   pro: 'nombre',
      //   input: 'text',
      //   titulo: "Segundo Nombre:",
      //   respuestas: '',
      //   obligatorio: false,
      // },
      {
        id: 5,
        tipo: 0,
        val: 'Nuñez',
        pro: 'apellido',
        input: 'text',
        titulo: "Apellido:",
        respuestas: '',
        obligatorio: true,
      },
      // {
      //   id: 6,
      //   tipo: 0,
      //   val: 'Mariño',
      //   pro: 'apellido',
      //   input: 'text',
      //   titulo: "Segundo Apellido:",
      //   respuestas: '',
      //   obligatorio: true,
      // },
      // {
      //   id: 7,
      //   tipo: 3,
      //   val: '',
      //   titulo: "Genero:",
      //   respuestas: [
      //     { id: 'M', texto: 'Masculino' },
      //     { id: 'F', texto: 'Femenino' },
      //     { id: 'O', texto: 'Otro' },
      //   ],
      //   obligatorio: true,
      // },
      {
        id: 7,
        tipo: 0,
        val: '14151617',
        pro: 'codigo_estudiante',
        input: 'number',
        titulo: "Código Estudiantil:",
        respuestas: '',
        obligatorio: false,
      },
      {
        id: 8,
        tipo: 0,
        val: '3235932414',
        pro: 'celular',
        input: 'number',
        titulo: "Numero Celular:",
        respuestas: '',
        obligatorio: true,
      },
      {
        id: 9,
        tipo: 0,
        val: 'cs@gmail.com',
        pro: 'correo',
        input: 'email',
        titulo: "Correro:",
        respuestas: '',
        obligatorio: false,
      },
      {
        id: 10,
        tipo: 0,
        val: '123',
        pro: 'clave',
        input: 'password',
        titulo: "Clave:",
        respuestas: '',
        obligatorio: false,
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
            case 'select':
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
            let respuestas = preguntas.map((pregunta) => {
              return {
                [this.user.preguntas[pregunta.index].pro]: pregunta.value
                // id: this.user.preguntas[pregunta.index].id,
                // tipo: this.user.preguntas[pregunta.index].tipo,
                // respuesta: (pregunta.value instanceof Array) ? pregunta.value.join(',') : pregunta.value
              }
            });
            let body = {};
            respuestas.forEach(element => {
              let key = Object.keys(element)[0];
              if (body.hasOwnProperty(key)) {
                console.log('Object', key)
                body[key] += ' ' + element[key];
              } else {
                body = Object.assign(body, element);
              }
            });;
            this._appService.requestSendBody('post', '/signup', body).subscribe(data => {
              debugger
              if (data.valid) {
                this._appService.presentAlert('alert-success', null, data.msg, null, 'Aceptar');
                this._router.navigate(['/login']);
              } else {
                this._appService.presentAlert('alert-error', null, data.msg, null, 'Aceptar');
              }
              this.loading = false;
            });
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
