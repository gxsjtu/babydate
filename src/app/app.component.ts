import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { OnboardPage } from '../pages/onboard/onboard';
import { HomePage } from '../pages/home/home';
import { SecureStorage } from 'ionic-native';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = null;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      let secureStorage: SecureStorage = new SecureStorage();
      secureStorage.create('babydate').then(() => {
        secureStorage.get('isFirstLogin').then(() => {
          this.rootPage = HomePage;
        }).catch(error => {
          this.rootPage = OnboardPage;
          secureStorage.set('isFirstLogin', 'true').then(key => {
            console.log(key);
          }).catch(error => {
            console.log(error);
          });
        });
      }).catch(error => {
        this.rootPage = OnboardPage;
        console.log(error);
      });
    });

  }
}
