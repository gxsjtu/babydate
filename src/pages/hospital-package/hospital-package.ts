import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import ProgressBar from 'progressbar.js';

/*
  Generated class for the HospitalPackage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-hospital-package',
  templateUrl: 'hospital-package.html'
})
export class HospitalPackagePage {

  constructor(public navCtrl: NavController) { }

  ionViewDidEnter() {
    var line = new ProgressBar.Line('#box');
    console.log(line);
    line.animate(0.3, {
      duration: 800
    }, function() {
      console.log('Animation has finished');
    });
  }
}
