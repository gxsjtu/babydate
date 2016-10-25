import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Center page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-center',
  templateUrl: 'center.html'
})
export class CenterPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Center Page');
  }

}
