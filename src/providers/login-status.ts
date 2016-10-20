import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoginStatus provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginStatus {
  private isLogin: boolean = false;
  constructor() {

  }

  isLoggedIn(){
    return this.isLogin;
  }

  login(){
    this.isLogin = true;
  }

  logout(){
    this.isLogin = false;
  }

}
