import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import { GlobalParameters } from '../../providers/global-parameters';
import * as Clocky from 'clocky';
import validator from 'validator';
declare const notify: any;
declare const $: any;

/*
  Generated class for the ChangePassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html'
})
export class ChangePasswordPage {
  codeText: string = '获取验证码';
  isCodeButtonDisable: boolean = false;
  mobile: string = '';
  code: string = '';
  password: string = '';
  isSubmit = false;

  constructor(public navCtrl: NavController, public http: Http, public navParams: NavParams, public vc: ViewController, public gParameters: GlobalParameters) {}

  ionViewWillEnter() {
    this.vc.setBackButtonText(this.navParams.get('backText'));
  }

  getCode() {
    if(!this.validatorMobile())
    {
      return;
    }
    let clocky = new Clocky.__moduleExports.Clocky();
    clocky.runFor(60);
    clocky.tickEvery(1);
    clocky.onTick((ticks, startedAt, elapsed) => {
      this.codeText = '重新获取验证码（' + (60 - ticks) + '秒）';
    });
    clocky.onStart((ticks, startedAt, elapsed) => {
      this.isCodeButtonDisable = true;
    });
    clocky.onStop((ticks, startedAt, elapsed) => {
      this.isCodeButtonDisable = false;
      this.codeText = '获取验证码';
    });
    clocky.start();
  }

  doChangePassword() {
    //不能为空的验证
    if(!this.validatorMobile())
    {
      return;
    }
    if (validator.isEmpty(this.code) == true) {
      $('#codeBox').notify('验证码不能为空', { position: "bottom center", className: 'error' });
      return;
    }
    if (validator.isEmpty(this.password) == true) {
      $('#passwordBox').notify('密码不能为空', { position: "bottom center", className: 'error' });
      return;
    }
    else
    {
      if (validator.isLength(this.password,{max:3})) {
        $('#passwordBox').notify('密码不能少于4位', { position: "bottom center", className: 'error' });
        return;
      }
    }

    this.isSubmit = true;
  }

  validatorMobile(){
    if (validator.isEmpty(this.mobile) == true) {
      $('#registerPageMobileBox').notify('手机号码不能为空', { position: "bottom center", className: 'error' });
      return false;
    }
    else
    {
        if(!validator.isMobilePhone(this.mobile,'zh-CN'))
        {
          $('#registerPageMobileBox').notify('手机号码格式不正确', { position: "bottom center", className: 'error' });
          return false;
        }
    }
    return true;
  }
}
