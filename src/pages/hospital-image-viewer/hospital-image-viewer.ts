import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the HospitalImageViewer page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-hospital-image-viewer',
  templateUrl: 'hospital-image-viewer.html'
})
export class HospitalImageViewerPage {
  images = [];
  constructor(public navCtrl: NavController, public params: NavParams,public viewCtrl: ViewController) {
    this.images = params.get('images');
  }

  ionViewDidLoad() {
    console.log('Hello HospitalImageViewer Page');
  }

  onClick(){
    this.viewCtrl.dismiss();
  }

}
