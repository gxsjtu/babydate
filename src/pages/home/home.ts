import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GlobalParameters } from '../../providers/global-parameters';
import { Http } from '@angular/http';
import { HospitalListPage } from '../hospital-list/hospital-list';
import { HospitalDetailPage } from '../hospital-detail/hospital-detail';
import { IdentitySelect } from '../identity-select/identity-select';
import {Converter} from '../../providers/converter';
declare const Swiper: any;
declare var $: any;
import Move from 'move-js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  hospitals = [];
  constructor(public navCtrl: NavController, public gParameters: GlobalParameters, public http: Http, public converter: Converter) {
    http.get(gParameters.SERVER + '/hospital/getTops').map(res => res.json()).subscribe(data => {
      if (data.status == 0) {
        this.hospitals = data.data;
      }
      else {
        //错误信息
      }
    }, error => {
      console.log(error);
    });
  }

  onBox(){
    Move('#box').set('opacity', 0.2).duration(1000).end();
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

  goHospitalDetail(hospital){
    this.navCtrl.push(HospitalDetailPage,{
      backText: '首页',
      hospital: hospital
    });
  }

  showSelect(){
    this.navCtrl.push(IdentitySelect);
  }
}
