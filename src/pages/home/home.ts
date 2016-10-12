import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
declare var Swiper: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  ionViewDidEnter() {

    let homeSwiper = new Swiper('.swiper-container', {
      autoplay: 2000,
      paginationClickable: true,
      pagination: '.swiper-pagination',
      loop: true
    });

  }

}
