import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Splashscreen } from 'ionic-native';
import { AccompanyPage } from '../accompany/accompany';
import {LoginStatus} from '../../providers/login-status';
import {LoginPage} from '../login/login';
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

  constructor(public navCtrl: NavController, public loginStatus: LoginStatus) {
    this.home = HomePage;
    if(loginStatus.isLoggedIn() == false){
      this.accompany = LoginPage;
    }else{
      this.accompany = AccompanyPage;
    }
  }

  ionViewWillEnter(){
    Splashscreen.hide();
  }
}
