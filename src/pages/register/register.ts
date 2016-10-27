import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, Events } from 'ionic-angular';
import { Http } from '@angular/http';
import { GlobalParameters } from '../../providers/global-parameters';
import 'rxjs/add/operator/timeout';
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
  isSubmit = false;

  constructor(public navCtrl: NavController, public http: Http, public navParams: NavParams, public vc: ViewController, public gParameters: GlobalParameters, public loadingCtrl: LoadingController, public events: Events) {

  }

  ionViewWillEnter() {
    this.vc.setBackButtonText(this.navParams.get('backText'));
  }

  doRegister() {
    //不能为空的验证
    if (!this.validatorMobile()) {
      return;
    }
    if (validator.isEmpty(this.code) == true) {
      $('#registerPageCodeBox').notify('验证码不能为空', { position: "bottom center", className: 'error' });
      return;
    }
    if (validator.isEmpty(this.password) == true) {
      $('#registerPagePasswordBox').notify('密码不能为空', { position: "bottom center", className: 'error' });
      return;
    }
    else {
      if (validator.isLength(this.password, { max: 3 })) {
        $('#registerPagePasswordBox').notify('密码不能少于4位', { position: "bottom center", className: 'error' });
        return;
      }
    }

    this.isSubmit = true;

    let loader = this.loadingCtrl.create({});
    loader.present();
    let params = "mobile=" + this.mobile + "&code=" + this.code + "&password=" + this.password;
    this.http.post(this.gParameters.SERVER + '/user/register', params).map(res => res.json()).finally(() => {
      loader.dismiss();
    }).subscribe(data => {
      if (data.status == 0) {
          this.isSubmit = false;
      }
      else {
        //错误信息
      }
    }, error => {
      console.log(error);
    });

  }

  validatorMobile() {
    if (validator.isEmpty(this.mobile.trim()) == true) {
      $('#registerPageMobileBox').notify('手机号码不能为空', { position: "bottom center", className: 'error' });
      return false;
    }
    else {
      if (!validator.isMobilePhone(this.mobile.trim(), 'zh-CN')) {
        $('#registerPageMobileBox').notify('手机号码格式不正确', { position: "bottom center", className: 'error' });
        return false;
      }
    }
    return true;
  }

  getCode() {
    if (!this.validatorMobile()) {
      return;
    }


    let clocky = new Clocky.__moduleExports.Clocky();
    clocky.runFor(60);
    clocky.tickEvery(1);
    clocky.onTick((ticks, startedAt, elapsed) => {
      this.codeText = '重新获取（' + (60 - ticks) + '秒）';
    });
    clocky.onStart((ticks, startedAt, elapsed) => {
      this.isCodeButtonDisable = true;
    });
    clocky.onStop((ticks, startedAt, elapsed) => {
      this.isCodeButtonDisable = false;
      this.codeText = '获取验证码';
    });
    clocky.start();


    this.http.get(this.gParameters.SERVER + '/hospital/sendVerifyCode/'+this.mobile.trim()+'/'+this.gParameters.verifyCodeUses.register).timeout(3000).map(res => res.json()).subscribe(data => {
      if (data.status != 0) {
        clocky.resume();
        this.events.publish('alert:show', data.message);
      }
    }, error => {
      //console.log(error);
      clocky.resume();
      this.events.publish('alert:show', error);
    });
  }
}
