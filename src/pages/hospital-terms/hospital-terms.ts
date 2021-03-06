import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the HospitalTerms page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-hospital-terms',
  templateUrl: 'hospital-terms.html'
})
export class HospitalTermsPage {

  terms: any;
  yList: any;
  cList: any;
  termList: any = "yTerm";

  constructor(public navCtrl: NavController, public params: NavParams) {
  }

  ionViewWillEnter() {
    this.terms = this.params.get('terms');
    this.yList = this.terms[0].docs;
    this.cList = this.terms[1].docs;
  }


}
