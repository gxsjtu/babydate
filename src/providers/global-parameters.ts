import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the GlobalParameters provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GlobalParameters {

  constructor(public http: Http) {

  }

  //（宽 ／ 高）
  public AD_MAIN_RATIO: number = 25 / 10;
  //public SERVER: string = 'https://nicebaby.shtx.com.cn';
  public SERVER: string = 'https://172.20.70.16:3000';

  //验证码的使用用途
  public verifyCodeUses = {
    register : 0,         //注册用户
    changePassword : 1    //忘记密码
  }

}
