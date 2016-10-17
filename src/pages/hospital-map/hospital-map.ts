import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello HospitalMap Page');
  }

}
