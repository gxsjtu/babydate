import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { OnboardPage } from '../pages/onboard/onboard';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { SecureStorage, AppVersion } from 'ionic-native';
import * as semver from 'semver';
import { LoginStatus } from '../providers/login-status';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = null;
  loginStatus = new LoginStatus();
  constructor(platform: Platform) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      AppVersion.getVersionNumber().then(ver => {

        let secureStorage: SecureStorage = new SecureStorage();
        secureStorage.create('babydate').then(() => {
          secureStorage.get('version').then(data => {
            if (semver.lt(data, ver) == true) {
              this.rootPage = OnboardPage;
              secureStorage.set('version', ver).then(key => {
                console.log(ver);
              }).catch(error => {
                console.log(error);
              });
            } else {
              this.rootPage = TabsPage;
            }

          }).catch(error => {
            this.rootPage = OnboardPage;
            secureStorage.set('version', ver).then(key => {
              console.log(ver);
            }).catch(error => {
              console.log(error);
            });
          });
        }).catch(error => {
          this.rootPage = OnboardPage;
          console.log(error);
        });

      }).catch(error => {
        console.log(error);
        //目前使用浏览器所以需要注释掉，发布时应该打开
        //this.rootPage = OnboardPage;
        this.rootPage = TabsPage;
      });

    });

  }
}
