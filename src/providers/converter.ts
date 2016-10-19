import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Converter provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Converter {

  constructor(public http: Http) {
    console.log('Hello Converter Provider');
  }

  getRate(score: number): number {
    return Math.floor(score / 20) + 0.5 * (score % 20 >= 10 ? 1 : 0);
  }

}
