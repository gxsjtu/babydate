import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
declare const Swiper: any;
import { Splashscreen } from 'ionic-native';

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

  ionViewWillEnter() {
    Splashscreen.hide();
  }

  ionViewDidEnter() {

    let onboardSwiper = new Swiper('.swiper-container', {
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
