import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GlobalParameters } from '../../providers/global-parameters';
import { Http } from '@angular/http';
import * as Swiper from 'swiper';
import { HospitalListPage } from '../hospital-list/hospital-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    hos=['','',''];
    rate=4.5;
  constructor(public navCtrl: NavController, public gParameters: GlobalParameters, public http: Http) {
    http.get( this.gParameters.SERVER + '/hospital/getTops').map(res => res.json()).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  ionViewDidEnter() {
    let adMain = document.getElementById('ad-main');
    adMain.style.width = document.body.clientWidth + 'px';
    adMain.style.height = document.body.clientWidth / this.gParameters.AD_MAIN_RATIO + 'px';
    new Swiper.default('.swiper-container', {
      autoplay: 2000,
      paginationClickable: true,
      pagination: '.swiper-pagination',
      loop: true,
      autoplayDisableOnInteraction: false,
    });
  }

  goHospital(){
      this.navCtrl.push(HospitalListPage, {
        BackText: '首页'
      });
  }

}
