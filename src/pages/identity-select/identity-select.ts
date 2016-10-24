import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SecureStorage } from 'ionic-native';
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
  minYear = moment().subtract(4,'years').format('YYYY');
  maxYear = moment().add('years',3).format('YYYY');
  selectedRole : string;
  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    console.log(moment().format('YYYY-MM-DD'));
  }

  selectRole(role)
  {
    this.selectedRole = role;
    this.imgWidth = $('#pregnant').width();
    if (this.canSelect && !$("#text").is(":animated")) {
      this.canSelect = false;
      this.selectDateText = role == 'pregnant' ? "预产日期" : '宝宝出生日期';
      $("#text").animate({
        opacity: 0
      }, 1000);
      let dismissDom = role == 'pregnant' ? $('#mother') : $('#pregnant');
      dismissDom.animate({
        opacity: 0
      }, 1000, function() {
        let content = $("#content").width();
        let width = $('#pregnant').width() + $('#pregnant').width() / 4;
        let height = $("#content").height();
        let top = $("#rowPic").scrollTop();
        let marginTop = top - ((height - width - $("#rowDate").height()) / 2);
        let left = role == 'pregnant' ? ((content - width) / 2) : ('-='+((content - width) / 2 + $('#mother').width() / 4));
        let moveDom = role == 'pregnant' ? $('#pregnant') : $('#mother');
        moveDom.animate({
          marginLeft: left,
          marginTop: marginTop,
          width: width
        }, 1000, function() {
          $("#select").animate({
            opacity: 1
          }, 1000);
        })

      });
    }
  }

  saveMySelected(){
    let secureStorage: SecureStorage = new SecureStorage();
    secureStorage.get('babydate').then(() => {
      secureStorage.set('role', this.selectedRole).then(key => {
        secureStorage.set('date', this.myDate).then(key => {
        }).catch(error => {
          console.log(error);
        });
      }).catch(error => {
        console.log(error);
      });
    });
  }
}
