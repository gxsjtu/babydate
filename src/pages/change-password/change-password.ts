import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, Events } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { GlobalParameters } from '../../providers/global-parameters';
import 'rxjs/add/operator/timeout';
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

  constructor(public navCtrl: NavController, public http: Http, public navParams: NavParams, public vc: ViewController, public gParameters: GlobalParameters, public loadingCtrl: LoadingController, public events: Events) {}

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


    this.http.get(this.gParameters.SERVER + '/hospital/sendVerifyCode/'+this.mobile.trim()+'/'+this.gParameters.verifyCodeUses.changePassword).timeout(3000).map(res => res.json()).subscribe(data => {
      if (data.status != 0) {
        //错误信息
        clocky.resume();
        this.events.publish('alert:show',data.message);
      }
      else{
        this.events.publish('alert:show', '密码修改成功');
        this.navCtrl.pop();
      }
    }, error => {
      //console.log(error);
      clocky.resume();
      this.events.publish('alert:show',error);
    });

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

    let loader = this.loadingCtrl.create({});
    loader.present();
    let params = JSON.stringify(
      { "tel": this.mobile, "verCode": this.code, "passWord": this.password }
    )
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.post(this.gParameters.SERVER + '/hospital/registerUser', params,options).map(res => res.json()).finally(() => {
      loader.dismiss();
      this.isSubmit = false;
    }).subscribe(data => {
      if (data.status == 0) {

      }
      else {
        //错误信息
        this.events.publish('alert:show', data.message);

      }
    }, error => {
      console.log(error);
      this.events.publish('alert:show', error);
    });
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
