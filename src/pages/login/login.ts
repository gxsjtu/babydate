import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController,Events } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { ChangePasswordPage } from '../change-password/change-password';
import { Http, Headers, RequestOptions } from '@angular/http';
import { GlobalParameters } from '../../providers/global-parameters';
import 'rxjs/add/operator/timeout';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public vc: ViewController, public http: Http, public gParameters: GlobalParameters, public loadingCtrl: LoadingController,public events: Events) {
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

  doLogin(){
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

    let loader = this.loadingCtrl.create({});
    loader.present();
    let params = JSON.stringify(
      { "tel": this.mobile, "passWord": this.password }
    )
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.post(this.gParameters.SERVER + '/user/login', params, options).timeout(6000).map(res => res.json()).finally(() => {
      loader.dismiss();
      this.isSubmit = false;
    }).subscribe(data => {
      if (data.status == 0) {

      }
      else {
        //错误信息
      }
    }, error => {
      console.log(error);
    });
  }
}
