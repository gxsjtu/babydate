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

  constructor(public navCtrl: NavController, public vc: ViewController, public params: NavParams) {
  }
}
