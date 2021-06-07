import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.page.html',
  styleUrls: ['./survey.page.scss'],
})
export class SurveyPage implements OnInit {

  loading: boolean;

  survey: any = {};

  constructor(private _router: Router, public _appService: AppService) { }

  ngOnInit() { }

  ionViewWillEnter() {
    // this.survey = {
    //   id: 0,
    //   titulo: 'El titulo de esta encuesta.',
    //   desc: 'AL enviar esta encuesta correctamente, tendrás acceso al código QR de entrada durante 6h, después de ese tiempo debes volver a hacer esta encuesta para obtener un nuevo codigo QR.',
    //   preguntas: [
    //     {
    //       tipo: 0,
    //       val: '',
    //       titulo: "Elige los síntomas que presentas recientemente:",
    //       respuestas: [
    //         { id: 1, texto: 'Fiebre', isChecked: false },
    //         { id: 1, texto: 'Dolor de garganta', isChecked: false },
    //         { id: 1, texto: 'Congestión nasal', isChecked: false },
    //         { id: 1, texto: 'Tos', isChecked: false },
    //         { id: 1, texto: 'Dificultad para respirar', isChecked: false },
    //         { id: 1, texto: 'Fatiga', isChecked: false },
    //         { id: 1, texto: 'Escalofrío', isChecked: false },
    //         { id: 1, texto: 'Dolor de músculos', isChecked: false },
    //         { id: 1, texto: 'Ninguno de los anteriores', isChecked: false },
    //       ],
    //       obligatorio: false,
    //     },
    //     {
    //       tipo: 1,
    //       val: '',
    //       titulo: "Elige las opciones que apliquen en tu caso:",
    //       respuestas: [
    //         { id: 1, texto: 'Estuve en contacto con alguien que tuvo alguno de estos síntomas', isChecked: false },
    //         { id: 2, texto: 'Hice un viaje internacional en los últimos 30 días', isChecked: false },
    //         { id: 3, texto: 'Hice un viaje nacional en los últimos 30 días', isChecked: false },
    //         { id: 4, texto: 'Ninguno de los anteriores', isChecked: false },
    //       ],
    //       obligatorio: true,
    //     },
    //     {
    //       tipo: 2,
    //       val: [],
    //       titulo: "El medio de transporte que utilizas para llegar a las instalaciones de la Universidad Libre:",
    //       respuestas: [
    //         { id: 1, texto: 'En transporte público masivo: Transmetro, Transmilenio…', isChecked: false },
    //         { id: 2, texto: 'En bus público', isChecked: false },
    //         { id: 3, texto: 'En taxi público', isChecked: false },
    //         { id: 4, texto: 'En el vehículo familiar/amigo', isChecked: false },
    //         { id: 5, texto: 'En mi propio vehículo/bicicleta/caminando', isChecked: false },
    //       ],
    //       obligatorio: false,
    //     },
    //     {
    //       tipo: 2,
    //       val: [],
    //       titulo: "¿Usted ya recibió la vacuna para el COVID-19?",
    //       respuestas: [
    //         { id: 1, texto: 'Si, la primera dosis', isChecked: false },
    //         { id: 2, texto: 'Si, la primera y segunda dosis', isChecked: false },
    //         { id: 3, texto: 'No', isChecked: false },
    //       ],
    //       obligatorio: true,
    //     }
    //   ]
    // };
    this._appService.request('get', '/survey', {}).subscribe(data => {
      if (data.valid) {
        data.print.preguntas = data.print.preguntas.map((item) => {
          if (item.tipo == 2) {
            item.val = [];
            item.respuestas.map((res) => {
              res.isChecked = res.isChecked || false;
              return res;
            })
          } else {
            item.val = '';
          };
          return item;
        });
        this.survey = data.print;
        console.log(this.survey);
      } else {
        this._appService.presentAlert('msg-error', null, data.print, null, 'Aceptar');
      }
    });
  }

  sendSurvey(data) {
    if (data.form.value) {
      let error = [];
      let preguntas = [];
      Object.entries(data.form.value).forEach(([key, value]) => {
        // console.log(key + ' ' + value);
        let index = key.split('-')[1];
        let type = key.split('-')[0];
        preguntas.push({ index: index, value: value });
        if (this.survey.preguntas[index].obligatorio) {
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
          if (this.survey && preguntas.length > 0) {
            this.loading = true;
            let body = {
              user_id: this._appService.session.id,
              encuesta_id: this.survey.id,
              preguntas: preguntas.map((pregunta) => {
                return {
                  id: this.survey.preguntas[pregunta.index].id,
                  tipo: this.survey.preguntas[pregunta.index].tipo,
                  respuesta: (pregunta.value instanceof Array) ? pregunta.value.join(',') : pregunta.value
                }
              })
            };
            this._appService.request('post', '/survey', body).subscribe(data => {
              console.log(data);
              if (data.valid) {
                if (data.print.codigo == 0) {
                  let update = this._appService.session;
                  update.fecha_encuesta = data.print.fecha_registro;
                  this._appService.session = update;
                  this._router.navigate(['/home']);
                } else {
                  this._appService.presentAlert('alert-error', null, data.print.msg, null, 'Aceptar');
                }
              } else {
                this._appService.presentAlert('alert-error', null, data.print.msg, null, 'Aceptar');
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
      this.survey.preguntas[index].val.push(checkbox.id);
    } else {
      this.survey.preguntas[index].val = this.survey.preguntas[index].val.filter((item) => {
        return item != checkbox.id;
      });
    }
  }

}
