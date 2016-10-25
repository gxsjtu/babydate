import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { GlobalParameters } from '../../providers/global-parameters';
import { Http } from '@angular/http';
import { HospitalListPage } from '../hospital-list/hospital-list';
import { HospitalDetailPage } from '../hospital-detail/hospital-detail';
import { Converter } from '../../providers/converter';
declare const Swiper: any;
declare var $: any;
import Promise from 'promise';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  hospitals = [];
  constructor(public navCtrl: NavController, public gParameters: GlobalParameters, public http: Http, public converter: Converter, public loadingCtrl: LoadingController) {
    let loader = loadingCtrl.create();
    loader.present();
    Promise.all([this.loadHospitals(), this.loadRecommend(), this.loadWork()]).then(res => {
      this.hospitals = res[0];
    }).catch(err => {
      console.log(err);
    }).done(() => {
      loader.dismiss();
    });
  }

  loadHospitals() {
    return new Promise((resolve, reject) => {
      this.http.get(this.gParameters.SERVER + '/hospital/getTops').map(res => res.json()).subscribe(data => {
        if (data.status == 0) {
          //this.hospitals = data.data;
          resolve(data.data);
        }
        else {
          console.log(data);
        }
      }, error => {
        console.log(error);
      });
    });
  }

  loadRecommend() {

  }

  loadWork() {

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
      autoplayDisableOnInteraction: false,
    });
  }

  goHospital() {
    this.navCtrl.push(HospitalListPage, {
      backText: '首页'
    });
  }

  goHospitalDetail(hospital) {
    this.navCtrl.push(HospitalDetailPage, {
      backText: '首页',
      hospital: hospital
    });
  }
}
