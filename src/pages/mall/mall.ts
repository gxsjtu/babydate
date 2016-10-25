import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Mall page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-mall',
  templateUrl: 'mall.html'
})
export class MallPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Mall Page');
  }

}
