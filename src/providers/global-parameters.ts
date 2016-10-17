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

}
