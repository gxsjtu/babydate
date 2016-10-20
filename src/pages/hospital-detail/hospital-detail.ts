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

  HosAddress: any;

  constructor(public navCtrl: NavController, public vc: ViewController, public params: NavParams) {
    this.HosAddress="浦东新区高科西路2699号";
  }

  getMap()
  {
    this.navCtrl.push(HospitalMapPage,{HosAddress:this.HosAddress});
  }
}
