import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as Swiper from 'swiper';

/*
  Generated class for the Onboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-onboard',
  templateUrl: 'onboard.html'
})
export class OnboardPage {

  constructor(public navCtrl: NavController) {

  }

  ionViewDidEnter() {

    let onboardSwiper = new Swiper.default('.swiper-container', {
      speed: 50,
      paginationClickable: true,
      pagination: '.swiper-pagination',
      allowSwipeToPrev: false
    });

    onboardSwiper.on('slideChangeEnd', () => {
      onboardSwiper.unlockSwipeToPrev();
      onboardSwiper.unlockSwipeToNext();

      if (onboardSwiper.isBeginning == true) {
        onboardSwiper.lockSwipeToPrev();
      } if (onboardSwiper.isEnd == true) {
        onboardSwiper.lockSwipeToNext();
      }
    });

  }

}
