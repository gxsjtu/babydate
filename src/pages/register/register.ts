import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as Clocky from 'clocky';
import validator from 'validator';
declare const notify: any;
declare const $: any;
/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  codeText: string = '获取验证码';
  isCodeButtonDisable: boolean = false;
  mobile: string = '';
  code: string = '';
  password: string = '';

  constructor(public navCtrl: NavController) {

  }

  doRegister() {
    console.log($('#mobileBox'));
    if (validator.isEmpty(this.mobile) == true) {
      $('#mobileBox').notify('手机号码不能为空', { position: "bottom center", className: 'error' });
    }
  }

  getCode() {
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
}
