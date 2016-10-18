import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GlobalParameters } from '../../providers/global-parameters';
import { Http } from '@angular/http';
import * as Swiper from 'swiper';
import { HospitalListPage } from '../hospital-list/hospital-list';
import {ControlAnchor} from 'angular2-baidu-map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  hospitals = [];
  constructor(public navCtrl: NavController, public gParameters: GlobalParameters, public http: Http) {
<<<<<<< Updated upstream
    http.get( gParameters.SERVER + '/hospital/getTops').map(res => res.json()).subscribe(data => {
      console.log(data);
=======
    http.get('https://172.20.67.197:3000/hospital/getTops').map(res => res.json()).subscribe(data => {
      if (data.status == 0) {
        this.hospitals = data.data;
        console.log(this.hospitals);
      }
      else {
        //错误信息
      }
>>>>>>> Stashed changes
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

  goHospital() {
    this.navCtrl.push(HospitalListPage, {
      BackText: '首页'
    });
  }

  getRate(score: number): number {
    return Math.floor(score / 20) + 0.5 * (score % 20 >= 10 ? 1 : 0);
  }

}
