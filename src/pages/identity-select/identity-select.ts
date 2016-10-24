import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { NativeStorage, Splashscreen } from 'ionic-native';
import { TabsPage } from '../tabs-page/tabs-page';
import moment from 'moment';
declare var $: any;

/*
  Generated class for the IdentitySelect page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-identity-select',
  templateUrl: 'identity-select.html'
})
export class IdentitySelect {
  canSelect = true;
  imgWidth = 0;
  selectDateText = "预产日期";
  myDate = '2016-10-24';
  minYear = moment().subtract(4, 'years').format('YYYY');
  maxYear = moment().add(3, 'years').format('YYYY');
  selectedRole: string;
  constructor(public navCtrl: NavController, public platform: Platform) {

  }

  ionViewWillEnter() {
    Splashscreen.hide();
  }

  selectRole(role) {
    this.selectedRole = role;
    this.imgWidth = $('#pregnant').width();
    if (this.canSelect && !$("#text").is(":animated")) {
      this.canSelect = false;
      this.selectDateText = role == 'pregnant' ? "预产日期" : '宝宝出生日期';
      $("#text").animate({
        opacity: 0
      }, 500);
      let dismissDom = role == 'pregnant' ? $('#mother') : $('#pregnant');
      dismissDom.animate({
        opacity: 0
      }, 500, function() {
        let content = $("#content").width();
        let width = $('#pregnant').width() + $('#pregnant').width() / 4;
        let height = $("#content").height();
        let top = $("#rowPic").scrollTop();
        let marginTop = top - ((height - width - $("#rowDate").height()) / 2);
        let left = role == 'pregnant' ? ((content - width) / 2) : ('-=' + ((content - width) / 2 + $('#mother').width() / 4));
        let moveDom = role == 'pregnant' ? $('#pregnant') : $('#mother');
        moveDom.animate({
          marginLeft: left,
          marginTop: marginTop,
          width: width
        }, 500, function() {
          $("#select").animate({
            opacity: 1
          }, 500);
        })

      });
    }
  }

  saveMySelected() {
    this.platform.ready().then(() => {
      NativeStorage.setItem('identity', { role: this.selectRole, date: this.myDate }).then(
        () => { this.navCtrl.setRoot(TabsPage); }
      ).catch(err => {
        console.log(err);
      });
      // let secureStorage: SecureStorage = new SecureStorage();
      // secureStorage.create('babydate').then(() => {
      //   secureStorage.set('stage', this.selectedRole).then(key => {
      //     secureStorage.set('date', this.myDate).then(key => {
      //       this.navCtrl.setRoot(TabsPage);
      //     }).catch(error => {
      //       console.log(error);
      //     });
      //   }).catch(error => {
      //     console.log(error);
      //   });
      // });
    });
  }
}
