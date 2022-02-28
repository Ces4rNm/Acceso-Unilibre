import { Component, ElementRef, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { LoadingController } from '@ionic/angular';
import jsQR from "jsqr";

import { Router } from '@angular/router';

@Component({
  selector: 'app-qr-scan',
  templateUrl: './qr-scan.page.html',
  styleUrls: ['./qr-scan.page.scss'],
})
export class QrScanPage {

  stream: any;
  scanActive: boolean = false;
  scanResult: any = null;

  @ViewChild('video', { static: false }) video: ElementRef;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;

  videoElement: any;
  canvasElement: any;
  canvasContext: any;

  loading: HTMLIonLoadingElement;

  result: any = {
    nombre: '',
    documento: '',
    fecha: '',
    analisis: '',
    nota: ''
  }

  constructor(
    private _router: Router,
    public _appService: AppService,
    private loadingCtrl: LoadingController
  ) { }

  showDetail() {
    console.log("ok");
    this._appService.ionAlert(
      'alert-info min-w-30 text-left',
      null,
      'Resultados:',
      'No presenta síntomas ni factores de riesgo asociados al Covid-19.',
      'Aceptar'
    );
  }

  ngAfterViewInit(): void {
    this.videoElement = this.video.nativeElement;
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvas.nativeElement.getContext('2d');
  }

  ionViewWillEnter() {
    this.startScan();
  }

  async startScan() {
    this.stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
    this.videoElement.srcObject = this.stream;
    this.videoElement.setAttribute('playsinline', true);
    this.videoElement.play();

    this.loading = await this.loadingCtrl.create({});
    await this.loading.present();

    this.clearResult();

    requestAnimationFrame(this.scan.bind(this));
  }

  async scan() {
    if (this.videoElement.readyState == this.videoElement.HAVE_ENOUGH_DATA) {
      if (this.loading) {
        await this.loading.dismiss();
        this.loading = null;
        this.scanActive = true;
      }
      this.canvasElement.height = this.videoElement.videoHeight;
      this.canvasElement.width = this.videoElement.videoWidth;

      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );

      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      )

      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      })
      console.log("🚀", code)

      if (code) {
        if (code.hasOwnProperty('data')) {
          let result;
          try {
            result = JSON.parse(code.data);
          } catch (error) {
            console.log("❌ ~ error", error)
            result = false;
          }
          if (result && result.hasOwnProperty('survey')) {
            console.log("✅ ~ ok", result)
            this.validDataCode(result);

            this.videoElement.pause();
            this.scanActive = false;
            this.scanResult = result;
            this.offAllCameras();
          } else {
            this._appService.ionAlert('alert-error', null, 'Datos escaneados invalidos, vuelve a intentarlo', null, 'Aceptar');
            // this.stopScan();
            this.scanResult = '';
          }
        } else {
          this._appService.ionAlert('alert-error', null, 'Datos invalidos, vuelve a intentarlo', null, 'Aceptar');
          // this.stopScan();
          this.scanResult = '';
        }
      } else {
        if (this.scanActive) {
          requestAnimationFrame(this.scan.bind(this));
        }

      }
    } else {
      requestAnimationFrame(this.scan.bind(this));
    }
  }

  validDataCode(data): void {
    const { d, c, t, n, i } = data.survey;
    // d: Date survey
    // c: Code survey
    // t: Type survey
    // n: Name user
    // i: Id user
    if (d) {
      if (!this.formatDate(d, 2)) {
        if (c) {
          this.result.nombre = n;
          this.result.documento = i;
          this.result.fecha = 'Valido hasta: ' + this.formatDate(d, 3);
          // this._appService.session.documento
          this._appService.ionLoading('load-survey', 'circular', 'Cargando Analisis...', true, 0);
          this._appService.request('get', '/record/' + c).subscribe(data => {
            this._appService.dismiss();
            if (data.valid) {
              const { analisis_encuesta } = data.print;
              if (analisis_encuesta) {
                this.result.analisis = analisis_encuesta.resultados;
                this.scanResult.survey.t = analisis_encuesta.tipo;
              } else {
                this.result.analisis = '';
                this._appService.ionAlert('alert-error', null, 'Error la respuesta no contiene el campo analisis_encuesta', null, 'Aceptar');
              }
            } else {
              this.result.analisis = '';
              this._appService.ionAlert('alert-error', null, data.msg, null, 'Aceptar');
            }
          });
        }
      } else {
        this._appService.ionAlert('alert-error', null, 'El código QR está vencido, debe llenar la encuesta nuevamente.', 'Valido hasta: <br>' + this.formatDate(data.survey.d, 3), 'Aceptar');
        this.result.fecha = 'QR vencido: ' + this.formatDate(data.survey.d, 3);
      }
    } else {
      this._appService.ionAlert('alert-error', null, 'El código QR no tiene un formato valido, vuelve a intentarlo.', null, 'Aceptar');
      this.result.fecha = 'Formato del QR invalido';
    }
  }

  sendDataEntry(estado) {
    const { survey } = this.scanResult;
    if (survey) {
      const { c } = survey;
      // c: Code survey
      if (c) {
        let body = {
          id_registro: c,
          estado: estado,
          observacion: this.result.nota
        }
        this._appService.requestSendBody('post', '/record', body).subscribe(data => {
          if (data.valid) {
            this._appService.ionAlert('alert-success', null, data.msg, null, 'Aceptar');
          } else {
            this._appService.ionAlert('alert-error', null, data.msg, null, 'Aceptar');
          }
          this.resetScan();
          this.startScan();
        });
      } else {
        this._appService.ionAlert('alert-error', null, 'Datos escaneados invalidos, intentelo de nuevo', null, 'Aceptar');
        this.resetScan();
        this.startScan();
      }
    } else {
      this._appService.ionAlert('alert-error', null, 'Datos invalidos, intentelo de nuevo', null, 'Aceptar');
      this.resetScan();
      this.startScan();
    }
  }

  clearResult(): void {
    this.result.nombre = '';
    this.result.documento = '';
    this.result.fecha = '';
    this.result.analisis = '';
    this.result.nota = '';
  }

  resetScan() {
    this.scanResult = null;
    this.videoElement.pause();
    this.videoElement.removeAttribute('src'); // empty source
    this.videoElement.load();
    this.offAllCameras();
  }

  stopScan() {
    this.videoElement.pause();
    this.scanActive = false;
    this.offAllCameras();
  }

  offAllCameras() {
    if (this.stream) {
      this.stream.getTracks().forEach(function (track) {
        track.stop();
      });
    }
  }

  formatDate(date, type): any {
    switch (type) {
      case 1:
        // (Date from database to application):string
        try {
          date = new Date(date);
          return date.toLocaleString([], { hour12: true });
        } catch (error) {
          console.log('FormatDatePipe:1', error);
          return '';
        }
      case 2:
        // ((Date from database + 6h) >= current Date):boolean
        try {
          let current = new Date();
          date = new Date(date);
          date.setHours(date.getHours() + 6);
          // console.log('(', current.getTime(), date.getTime(), ')', (current.getTime() >= date.getTime()));
          return (current.getTime() >= date.getTime());
        } catch (error) {
          console.log('FormatDatePipe:2', error);
          return true;
        }
      case 3:
        // (Date from database + 6h):string
        try {
          date = new Date(date);
          date.setHours(date.getHours() + 6);
          return date.toLocaleString([], { hour12: true });
        } catch (error) {
          console.log('FormatDatePipe:3', error);
          return true;
        }
      default:
        return date;
    }
  }

}
