import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';

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
  @ViewChild('onboardSlider') slider: Slides;
  onboardSliderOptions = {
    pager: true,
    speed: 20,
    allowSwipeToPrev: false
  };

  constructor(public navCtrl: NavController) {

  }

  onSliderChanged() {
    this.slider.getSlider().params.allowSwipeToPrev = true;
    this.slider.getSlider().params.allowSwipeToNext = true;
    if (this.slider.isBeginning() == true) {
      this.slider.getSlider().params.allowSwipeToPrev = false;
    }
    if (this.slider.isEnd() == true) {
      this.slider.getSlider().params.allowSwipeToNext = false;
    }
  }

}
