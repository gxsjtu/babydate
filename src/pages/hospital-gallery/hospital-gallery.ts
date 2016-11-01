import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, Events, LoadingController, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import { GlobalParameters } from '../../providers/global-parameters';
import { HospitalImageViewerPage } from '../hospital-image-viewer/hospital-image-viewer';
import 'rxjs/Rx';
import Promise from 'promise';
declare const Swiper: any;
declare var $: any;
/*
  Generated class for the HospitalGallery page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-hospital-gallery',
  templateUrl: 'hospital-gallery.html'
})
export class HospitalGalleryPage {
  showBigPic = false;
  environmentArray = [];
  facilityArray = [];
  roomArray = [];
  allArray = [];
  displayArray = [];
  hospitalId;

  constructor(public navCtrl: NavController, public vc: ViewController, public params: NavParams, public http: Http, public events: Events, public loadingCtrl: LoadingController, public gParameters: GlobalParameters, public modalCtrl: ModalController) {
    this.hospitalId = params.get('hospitalId');
    console.log(document.body.clientWidth);
  }

  // ionViewWillEnter() {
  //   this.vc.setBackButtonText(this.params.get('backText'));
  // }
  ionViewDidEnter() {
    this.onEnvironmentClick();//默认加载环境图片
  }

  //从网络获取医院图片
  loadHospitalImage(imageType: string) {
    //console.log(this.gParameters.SERVER + '/hospital/getImage/'+this.hospitalId+'/'+imageType);
    return new Promise((resolve, reject) => {
      this.http.get(this.gParameters.SERVER + '/hospital/getImage/' + this.hospitalId + '/' + imageType).map(res => res.json()).subscribe((data) => {
        if (data.status == 0) {
          resolve(data.data);
        }
        else {
          reject(data.message);
        }
      }, error => {
        reject(error);
      });
    });

  }
  //点击环境
  onEnvironmentClick() {
    let loader = this.loadingCtrl.create();
    loader.present();
    if (this.environmentArray.length == 0) {
      //加载环境图片
      this.loadHospitalImage('environment').then((data) => {
        this.environmentArray = data;
        this.displayArray = this.environmentArray;
      }).catch((error) => {
        this.events.publish('alert:show', error);
      }).finally(() => {
        loader.dismiss();
      });
    }
    else {
      this.displayArray = this.environmentArray;
      loader.dismiss();
    }
  }
  //点击设施
  onFacilityClick() {
    let loader = this.loadingCtrl.create();
    loader.present();
    if (this.facilityArray.length == 0) {
      //加载设施图片
      this.loadHospitalImage('facility').then((data) => {
        this.facilityArray = data;
        this.displayArray = this.facilityArray;
      }).catch((error) => {
        this.events.publish('alert:show', error);
      }).finally(() => {
        loader.dismiss();
      });
    }
    else {
      this.displayArray = this.facilityArray;
      loader.dismiss();
    }
  }
  //点击病房
  onRoomClick() {
    let loader = this.loadingCtrl.create();
    loader.present();
    if (this.roomArray.length == 0) {
      //加载病房图片
      this.loadHospitalImage('room').then((data) => {
        this.roomArray = data;
        this.displayArray = this.roomArray;
      }).catch((error) => {
        this.events.publish('alert:show', error);
      }).finally(() => {
        loader.dismiss();
      });
    }
    else {
      this.displayArray = this.roomArray;
      loader.dismiss();
    }
  }
  //点击全部
  onAllClick() {
    let loader = this.loadingCtrl.create();
    loader.present();
    if (this.allArray.length == 0) {
      let requireLoadArray = [];
      let requireArray = [];
      if (this.environmentArray.length == 0) {
        //加载环境图片
        requireArray.push('environmentArray');
        requireLoadArray.push(this.loadHospitalImage('environment'));
      }
      if (this.facilityArray.length == 0) {
        //加载设施图片
        requireLoadArray.push(this.loadHospitalImage('facility'));
        requireArray.push('facilityArray');
      }
      if (this.roomArray.length == 0) {
        //加载病房图片
        requireLoadArray.push(this.loadHospitalImage('room'));
        requireArray.push('roomArray');
      }
      if (requireLoadArray.length > 0) {
        Promise.all(requireLoadArray).then(res => {
          for (let i = 0; i < requireLoadArray.length; i++) {
            if (requireArray[i] == "environmentArray") {
              this.environmentArray = res[i];
            }
            else if (requireArray[i] == "facilityArray") {
              this.facilityArray = res[i];
            }
            else {
              this.roomArray = res[i];
            }
          }

          this.mergeArrayToAll();
          this.displayArray = this.allArray;
        }).finally(() => {
          loader.dismiss();
        });
      }
      else {
        this.mergeArrayToAll();
        this.displayArray = this.allArray;
        loader.dismiss();
      }
    }
    else {
      this.displayArray = this.allArray;
      loader.dismiss();
    }
  }

  mergeArrayToAll() {
    this.allArray = this.environmentArray.concat(this.facilityArray).concat(this.roomArray);
  }

  pressEvent() {
    let modal = this.modalCtrl.create(HospitalImageViewerPage, {
      images: this.displayArray
    });
    modal.present();
  }
}
