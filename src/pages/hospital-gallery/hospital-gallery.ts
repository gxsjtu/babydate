import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

/*
  Generated class for the HospitalGallery page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-hospital-gallery',
  templateUrl: 'hospital-gallery.html'
})
export class HospitalGalleryPage {

  constructor(public navCtrl: NavController, public vc: ViewController, public params: NavParams) {}

  // ionViewWillEnter() {
  //   this.vc.setBackButtonText(this.params.get('backText'));
  // }

}
