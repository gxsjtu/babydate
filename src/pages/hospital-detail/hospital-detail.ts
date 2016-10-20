import { Component } from '@angular/core';
import { HospitalMapPage } from '../hospital-map/hospital-map';
import { NavController, ViewController, NavParams, LoadingController} from 'ionic-angular';
import {Converter} from '../../providers/converter';

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
  constructor(public navCtrl: NavController, public vc: ViewController, public params: NavParams, public converter: Converter, public loadingCtrl: LoadingController) {
    this.hospital = this.params.get('hospital');
    this.getLessDescription();
  }

  getMap() {
    this.navCtrl.push(HospitalMapPage, { HosAddress: this.hospital.address });
  }

  ionViewWillEnter() {
    this.vc.setBackButtonText(this.params.get('backText'));
  }

  getLessDescription() {
    let desc = this.hospital.description;
    if (desc.length>200) {
      this.lessDescription = desc.substr(0,200)+'...';
      this.showLessDescription = true;
    }
    else
    {
      this.lessDescription = desc;
      this.showLessDescription = false;
    }
  }

  descriptionButtonClick()
  {
    this.showLessDescription = !this.showLessDescription;
    if(this.showLessDescription)
    {
      this.descriptionButtonText = "展开";
    }
    else
    {
      this.descriptionButtonText = "收起";
    }
  }
}
