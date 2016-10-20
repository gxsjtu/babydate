import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Splashscreen } from 'ionic-native';
import { AccompanyPage } from '../accompany/accompany';
/*
  Generated class for the TabsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tabs-page',
  templateUrl: 'tabs-page.html'
})
export class TabsPage {

  home: any;
  accompany: any;
  assistant: any;
  mall: any;
  center: any;

  constructor(public navCtrl: NavController) {
    this.home = HomePage;
    this.accompany = AccompanyPage;
  }

  ionViewWillEnter(){
    Splashscreen.hide();
  }
}
