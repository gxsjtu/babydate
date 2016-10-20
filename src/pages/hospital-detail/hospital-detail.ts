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

  hospital = null;
  constructor(public navCtrl: NavController, public vc: ViewController, public params: NavParams, public converter: Converter, public loadingCtrl: LoadingController) {
    this.hospital = this.params.get('hospital');
  }

  getMap() {
    this.navCtrl.push(HospitalMapPage, { HosAddress: this.hospital.address });
  }

  ionViewWillEnter() {
    this.vc.setBackButtonText(this.params.get('backText'));
  }
}
