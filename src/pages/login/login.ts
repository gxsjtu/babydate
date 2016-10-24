import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { ChangePasswordPage } from '../change-password/change-password';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  fromPage: string = null;
  constructor(public navCtrl: NavController, public navParams: NavParams, public vc: ViewController) {
    this.fromPage = this.navParams.get('fromPage');
  }

  gotoRegister(){
    this.navCtrl.push(RegisterPage, {
      backText: '登录'
    });
  }

  gotoChangePassword(){
    this.navCtrl.push(ChangePasswordPage, {
      backText: '忘记密码'
    });
  }
}
