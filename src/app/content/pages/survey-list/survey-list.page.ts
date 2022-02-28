import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.page.html',
  styleUrls: ['./survey-list.page.scss'],
})
export class SurveyListPage implements OnInit {

  list: any;

  constructor(private _router: Router, public _appService: AppService) { }

  ngOnInit() {
    this.list = {
      tipo: -2,
      titulo: 'Filtros para listar la información',
      desc: 'Esta información es confidencial y no se permite el uso o la divulgación de la misma fuera de la Universidad Libre.',
      results: this._appService.temp
    };
  }

  ionViewWillEnter() {
    // this._appService.ionLoading('load-survey', 'circular', 'Cargando...', true, 0);

    // this._appService.request('get', '/survey').subscribe(data => {
    //   this._appService.dismiss();
    //   if (data.valid) {
    //     data.print.preguntas = data.print.preguntas.map((item) => {
    //       if (item.tipo == 2) {
    //         item.val = [];
    //         item.respuestas.map((res) => {
    //           res.isChecked = res.isChecked || false;
    //           return res;
    //         })
    //       } else {
    //         item.val = '';
    //       };
    //       return item;
    //     });
    //     this.survey = data.print;
    //     console.log('this.survey:', this.survey);
    //   } else {
    //     this._appService.ionAlert('alert-error', null, data.msg, null, 'Aceptar');
    //   }
    // });
  }

  onSelectChange(selectedValue: any) {
    console.log(selectedValue.detail.value);
    selectedValue = selectedValue.detail.value;
    if (selectedValue != -2) {
      this.list.results = this._appService.temp.filter(item => item.tipo == selectedValue);
    } else {
      this.list.results = this._appService.temp;
    }
  }

}
