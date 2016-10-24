import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { OnboardPage } from '../pages/onboard/onboard';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { NativeStorage, AppVersion } from 'ionic-native';
import * as semver from 'semver';
import { LoginStatus } from '../providers/login-status';
import { IdentitySelect } from '../pages/identity-select/identity-select';

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
        NativeStorage.getItem('version').then(data => {
          console.log(data);
          if (semver.lt(data.version, ver) == true) {
            this.rootPage = OnboardPage;
            NativeStorage.setItem('version', { version: ver }).then(
            ).catch(err => {
              console.log(err);
            });
          } else {
            NativeStorage.getItem('identity').then(
              () => { this.rootPage = TabsPage; }
            ).catch(err => {
              console.log(err);
              this.rootPage = IdentitySelect;
            });
          }
        }).catch(err => {
          console.log(err);
          NativeStorage.setItem('version', { version: ver }).then(
          ).catch(err => {
            console.log(err);
          });
          this.rootPage = OnboardPage;
        });

        // let secureStorage: SecureStorage = new SecureStorage();
        // secureStorage.create('babydate').then(() => {
        //   secureStorage.get('version').then(data => {
        //     if (semver.lt(data, ver) == true) {
        //       this.rootPage = OnboardPage;
        //       secureStorage.set('version', ver).then(key => {
        //         console.log(ver);
        //       }).catch(error => {
        //         console.log(error);
        //       });
        //     } else {
        //       //身份是否已经选择。如没有选择进入选择页面
        //       secureStorage.get('stage').then(data => {
        //         this.rootPage = TabsPage;
        //       }).catch(err => {
        //         console.log(err);
        //         this.rootPage = IdentitySelect;
        //       });
        //     }
        //   }).catch(error => {
        //     this.rootPage = OnboardPage;
        //     secureStorage.set('version', ver).then(key => {
        //       console.log(ver);
        //     }).catch(error => {
        //       console.log(error);
        //     });
        //   });
        // }).catch(error => {
        //   this.rootPage = OnboardPage;
        //   console.log(error);
        // });

      }).catch(error => {
        this.rootPage = OnboardPage;
      });
    });
  }
}
