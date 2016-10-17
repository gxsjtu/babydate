import { Component } from '@angular/core';
import { GlobalParameters } from '../../providers/global-parameters';
import { NavController,NavParams } from 'ionic-angular';
/*
  Generated class for the HospitalMap page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-hospital-map',
  templateUrl: 'hospital-map.html'
})
export class HospitalMapPage {

  constructor(public navCtrl: NavController, public gParameters: GlobalParameters, public params: NavParams) {

  }

  ionViewDidLoad() {
    console.log('Hello HospitalMap Page');
  }

}
