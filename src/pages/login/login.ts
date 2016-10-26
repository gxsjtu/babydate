import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { ChangePasswordPage } from '../change-password/change-password';
import { Http } from '@angular/http';
import { GlobalParameters } from '../../providers/global-parameters';
import validator from 'validator';
declare const notify: any;
declare const $: any;

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
  mobile: string = '';
  password: string = '';
  isSubmit = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public vc: ViewController, public http: Http, public gParameters: GlobalParameters) {
    this.fromPage = this.navParams.get('fromPage');
  }

  gotoRegister(){
    this.navCtrl.push(RegisterPage, {
      backText: '登录'
    });
  }

  gotoChangePassword(){
    this.navCtrl.push(ChangePasswordPage, {
      backText: '登录'
    });
  }

  onLogin(){
    if (validator.isEmpty(this.mobile) == true) {
      $('#loginPageMobileBox').notify('手机号码不能为空', { position: "bottom center", className: 'error' });
      return;
    }
    else
    {
        if(!validator.isMobilePhone(this.mobile,'zh-CN'))
        {
          $('#loginPageMobileBox').notify('手机号码格式不正确', { position: "bottom center", className: 'error' });
          return;
        }
    }
    if (validator.isEmpty(this.password) == true) {
      $('#loginPagePasswordBox').notify('密码不能为空', { position: "bottom center", className: 'error' });
      return;
    }
    else
    {
      if (validator.isLength(this.password,{max:3})) {
        $('#loginPagePasswordBox').notify('密码不能少于4位', { position: "bottom center", className: 'error' });
        return;
      }
    }
    this.isSubmit = true;
  }
}
