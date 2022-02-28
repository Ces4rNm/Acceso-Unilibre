import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';
import { AppService } from './app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  constructor(
    public _appService: AppService,
    private platform: Platform,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    // Wait for the platform to be ready
    this.platform.ready().then((source) => {
      // Set style for status bar
      if (Capacitor.isPluginAvailable('StatusBar')) {
        StatusBar.setBackgroundColor({ color: "#1D7151" });
        // let darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        // if (darkMediaQuery) {
        //   StatusBar.setStyle({ style: Style.Dark });
        // } else {
        //   StatusBar.setBackgroundColor({ color: "#1D7151" });
        // }
      };
      // Set platform
      if (this.platform.is('android')) {
        this._appService.platformIs = 'android';
      } else if (this.platform.is('ios')) {
        this._appService.platformIs = 'ios';
      } else if (this.platform.is('mobileweb')) {
        this._appService.platformIs = 'mobileweb';
      } else {
        this._appService.platformIs = source;
      }
    });
  }
}
