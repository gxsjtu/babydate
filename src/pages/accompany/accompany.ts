import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginStatus } from '../../providers/login-status';
import { LoginPage } from '../login/login';

/*
  Generated class for the Accompany page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-accompany',
  templateUrl: 'accompany.html'
})
export class AccompanyPage {

  constructor(public navCtrl: NavController, public loginStatus: LoginStatus) {
    console.log(loginStatus);
    if(loginStatus.isLoggedIn() == false){
      navCtrl.setRoot(LoginPage, {fromPage: 'accompany'});
    }
  }

}
