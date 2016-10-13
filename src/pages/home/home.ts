import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GlobalParameters } from '../../providers/global-parameters';
declare var Swiper: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public gParameters: GlobalParameters) {

  }

  ionViewDidEnter() {
    let adMain = document.getElementById('ad-main');
    adMain.style.width = document.body.clientWidth + 'px';
    adMain.style.height = document.body.clientWidth / this.gParameters.AD_MAIN_RATIO + 'px';
    new Swiper('.swiper-container', {
      autoplay: 2000,
      paginationClickable: true,
      pagination: '.swiper-pagination',
      loop: true,
      autoplayDisableOnInteraction: false
    });
  }

}
