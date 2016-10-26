import { Component } from '@angular/core';
import { HospitalMapPage } from '../hospital-map/hospital-map';
import { NavController, ViewController, NavParams, LoadingController, ActionSheetController } from 'ionic-angular';
import {Converter} from '../../providers/converter';
import {HospitalGalleryPage} from '../hospital-gallery/hospital-gallery';
import { CallNumber } from 'ionic-native';
import { HospitalTermsPage } from '../hospital-terms/hospital-terms';

/*
  Generated class for the HospitalDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-hospital-detail',
  templateUrl: 'hospital-detail.html'
})
export class HospitalDetailPage {

  hospital = null;
  lessDescription: string;
  showLessDescription = true;
  descriptionButtonText = "展开";
  constructor(public navCtrl: NavController, public vc: ViewController, public params: NavParams, public converter: Converter, public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController) {
    this.hospital = this.params.get('hospital');
    this.getLessDescription();
  }

  gotoHospitalTerms(){
    this.navCtrl.push(HospitalTermsPage);
  }

  getMap(address) {
    this.navCtrl.push(HospitalMapPage, { HosAddress: address });
  }

  ionViewWillEnter() {
    this.vc.setBackButtonText(this.params.get('backText'));
  }

  gotoHospitalGallery(){
    this.navCtrl.push(HospitalGalleryPage, {
      backText: this.hospital.name
    })
  }

  getLessDescription() {
    let desc = this.hospital.description;
    if (desc.length > 200) {
      this.lessDescription = desc.substr(0, 200) + '...';
      this.showLessDescription = true;
    }
    else {
      this.lessDescription = desc;
      this.showLessDescription = false;
    }
  }

  descriptionButtonClick() {
    this.showLessDescription = !this.showLessDescription;
    if (this.showLessDescription) {
      this.descriptionButtonText = "展开";
    }
    else {
      this.descriptionButtonText = "收起";
    }
  }

  showHospitalTel() {
    //主机号码
    if (this.hospital.hasOwnProperty('tel')) {
      let telButtons = [];


      if (this.hospital.tel.hasOwnProperty('others') && this.hospital.tel.others.length > 0) {
        for (let i = 0; i < this.hospital.tel.others.length; i++) {
          telButtons.push({
            text: this.hospital.tel.others[i].name + ' : ' + this.hospital.tel.others[i].number,
            handler: () => {
              CallNumber.callNumber(this.hospital.tel.others[i].number, true).catch(() => console.log('Error launching dialer'));
            }
          });
        }
      }

      if (this.hospital.tel.hasOwnProperty('main')) {
        telButtons.push({
          text: this.hospital.tel.main.name + ' : ' + this.hospital.tel.main.number,
          handler: () => {
            //window.location = this.hospital.tel.main.number;
            CallNumber.callNumber(this.hospital.tel.main.number, true).catch(() => console.log('Error launching dialer'));
          }
        });
      }

      telButtons.push({
        text: '取消',
        role: 'cancel',
        handler: () => {

        }
      });

      let actionSheet = this.actionSheetCtrl.create({
        buttons: telButtons
      });
      actionSheet.present();
    }
  }
}
