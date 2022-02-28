import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-survey-chart',
  templateUrl: './survey-chart.page.html',
  styleUrls: ['./survey-chart.page.scss'],
})
export class SurveyChartPage implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  showChart: boolean = false;

  list: any;

  constructor(private _router: Router, public _appService: AppService) {
    this.chartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Contagios por Covid-19'
      },
      xAxis: {
        type: 'category',
        labels: {
          rotation: -45,
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
          }
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Encuestas'
        }
      },
      legend: {
        enabled: false
      },
      tooltip: {
        pointFormat: '<b>{point.y} Encuestas</b>'
      },
      series: [{
        name: 'Population',
        type: 'column',
        data: [
          ['Bajo', 245],
          ['Medio', 132],
          ['Alto', 15],
        ],
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: '#FFFFFF',
          align: 'right',
          format: '{point.y}', // one decimal
          y: 10, // 10 pixels down from the top
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
          }
        }
      }]
    };
  }

  ngOnInit() {
    this.list = {
      tipo: -2,
      titulo: 'Grafica generada por las encuestas:',
      desc: 'Esta información es confidencial y no se permite el uso o la divulgación de la misma fuera de la Universidad Libre.'
    };
  }

  ionViewWillEnter() {
    this.showChart = false;
    setTimeout(() => {
      this.showChart = true;
    }, 100);
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
