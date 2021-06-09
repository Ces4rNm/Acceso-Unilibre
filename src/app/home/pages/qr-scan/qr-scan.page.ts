import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-qr-scan',
  templateUrl: './qr-scan.page.html',
  styleUrls: ['./qr-scan.page.scss'],
})
export class QrScanPage implements OnInit {

  constructor(public _appService: AppService) { }

  ngOnInit() {
  }

  showDetail() {
    console.log("ok");
    this._appService.presentAlert(
      'alert-success min-w-30 text-justify',
      null,
      'Descripción QR:',
      'Actualmente no reporta síntomas ni factores de riesgo asociados al Covid-19.',
      'Aceptar'
    );
  }

}
