import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { HospitalDetailPage } from '../pages/hospital-detail/hospital-detail';
/*
  Generated class for the HospitalList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-hospital-list',
  templateUrl: 'hospital-list.html'
})
export class HospitalListPage {
  hos = ['', '', '', '', '', '', '', ''];
  constructor(public navCtrl: NavController, public vc: ViewController, public params: NavParams) {
    console.log(navCtrl.canSwipeBack());
  }

  ionViewDidLoad() {
    console.log('Hello HospitalList Page');
  }

  ionViewWillEnter() {
    this.vc.setBackButtonText(this.params.get('backText'));
  }

  onHospitalClick(){
    this.navCtrl.push('HospitalDetailPage', {
      backText: '',
      address: '',
      district: '',
      level: '',
      description: ''
    })
  }

}
