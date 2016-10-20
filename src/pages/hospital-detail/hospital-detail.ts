import { Component } from '@angular/core';
import { HospitalMapPage } from '../hospital-map/hospital-map';
import { NavController, ViewController, NavParams, LoadingController} from 'ionic-angular';
import {Converter} from '../../providers/converter';

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
  hospital = null;
  constructor(public navCtrl: NavController, public vc: ViewController, public params: NavParams, public converter: Converter, public loadingCtrl: LoadingController) {
    this.HosAddress = "浦东新区高科西路2699号";
  }

  getMap() {
    this.navCtrl.push(HospitalMapPage, { HosAddress: this.HosAddress });
  }

  ionViewWillEnter() {
    this.vc.setBackButtonText(this.params.get('BackText'));
    this.hospital = this.params.get('Hospital');
  }
}
