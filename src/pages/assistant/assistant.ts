import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Assistant page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-assistant',
  templateUrl: 'assistant.html'
})
export class AssistantPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Assistant Page');
  }

}
