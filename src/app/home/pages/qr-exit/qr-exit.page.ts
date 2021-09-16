import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import jsQR from "jsqr";
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-qr-exit',
  templateUrl: './qr-exit.page.html',
  styleUrls: ['./qr-exit.page.scss'],
})
export class QrExitPage {

  stream: any;
  scanActive: boolean = false;
  scanResult: any = null;

  @ViewChild('video', { static: false }) video: ElementRef;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;

  videoElement: any;
  canvasElement: any;
  canvasContext: any;

  loading: HTMLIonLoadingElement;

  loadingExit: boolean = false;

  constructor(
    private _router: Router,
    public _appService: AppService,
    private loadingCtrl: LoadingController
  ) { }

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
          if (result && result.hasOwnProperty('exit')) {
            console.log("✅ ~ ok", result)
            this.videoElement.pause();
            this.scanActive = false;
            this.scanResult = result;
            this.stream.getTracks().forEach(function (track) {
              track.stop();
            });
          } else {
            this._appService.presentAlert('alert-error', null, 'Datos escaneados invalidos, vuelve a intentarlo', null, 'Aceptar');
            // this.stopScan();
            this.scanResult = '';
          }
        } else {
          this._appService.presentAlert('alert-error', null, 'Datos invalidos, vuelve a intentarlo', null, 'Aceptar');
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

  sendDataExit(): void {
    if (this._appService.session.id_registro && this._appService.session.documento && this.scanResult) {
      if (this.scanResult.hasOwnProperty('exit')) {
        let body = {
          id_registro: this._appService.session.id_registro,
          id_user: this._appService.session.id_registro,
          id_sede: this.scanResult.c
        }
        this.loadingExit = true;
        this._appService.requestSendBody('post', '/exit', body).subscribe(data => {
          if (data.valid) {
            this._router.navigate(['/home']);
            this._appService.presentAlert('alert-success', null, data.print.msg, null, 'Aceptar');
          } else {
            this._appService.presentAlert('alert-error', null, data.print, null, 'Aceptar');
          }
          this.loadingExit = false;
          this.resetScan();
        });
      } else {
        this._appService.presentAlert('alert-error', null, 'Datos escaneados invalidos, intentelo de nuevo', null, 'Aceptar');
        this.resetScan();
      }
    } else {
      this._appService.presentAlert('alert-error', null, 'Datos invalidos, intentelo de nuevo', null, 'Aceptar');
      this.resetScan();
    }
  }

  resetScan() {
    this.scanResult = null;
    this.videoElement.pause();
    this.videoElement.removeAttribute('src'); // empty source
    this.videoElement.load();
    this.stream.getTracks().forEach(function (track) {
      track.stop();
    });
  }

  stopScan() {
    this.videoElement.pause();
    this.scanActive = false;
    this.stream.getTracks().forEach(function (track) {
      track.stop();
    });
  }

}
