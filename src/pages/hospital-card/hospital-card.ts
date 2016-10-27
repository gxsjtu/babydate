import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the HospitalCard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-hospital-card',
  templateUrl: 'hospital-card.html'
})
export class HospitalCardPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello HospitalCard Page');
  }

}
