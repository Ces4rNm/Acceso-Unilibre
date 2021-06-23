import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tourt',
  templateUrl: './tourt.page.html',
  styleUrls: ['./tourt.page.scss'],
})
export class TourtPage implements OnInit {
  @ViewChild('slides') slides;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };
  activeIndex: number = 0;
  showLogin: boolean = false;

  constructor(private _router: Router) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.slideOpts = {
      initialSlide: 0,
      speed: 400,
    };
  }

  slideChanged(slides) {
    slides.getActiveIndex().then(index => {
      this.activeIndex = index;
      this.showLogin = (index == 2) ? true : false;
    });
  }

  next(slides) {
    slides.isEnd().then(response => {
      if (response) {
        this.slideOpts = {
          initialSlide: 0,
          speed: 400,
        };
        this._router.navigate(['login']);
      };
    });
    slides.slideNext();
  }

  prev(slides) {
    slides.slidePrev();
  }

}
