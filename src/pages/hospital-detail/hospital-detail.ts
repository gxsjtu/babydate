import { Component } from '@angular/core';
import { NavController,ViewController ,NavParams} from 'ionic-angular';
import { HospitalMapPage } from '../hospital-map/hospital-map';

/*
  Generated class for the HospitalDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-hospital-detail',
  templateUrl: 'hospital-detail.html'
})
export class HospitalDetailPage {

  hospitalAddress : any;

  constructor(public navCtrl: NavController, public vc: ViewController, public params: NavParams) {
    this.hospitalAddress = '浦东新区高科西路2699号';
  }

  ionViewDidLoad() {
    console.log('Hello HospitalDetail Page');
  }

  searchMap(){
      this.navCtrl.push(HospitalMapPage,
        {BackText: '医院详情', hospitalAddress:this.hospitalAddress}
      );
  }



}
