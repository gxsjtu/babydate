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
    pager: true
  }

  onOnboardSliderChange(){
    if(this.slider.isBeginning() == true){
      //不能右滑
      console.log(this.slider.getSlider());
    }
  }

  constructor(public navCtrl: NavController) {}

}
