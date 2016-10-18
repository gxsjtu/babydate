import { Component } from '@angular/core';
import { HospitalDetailPage } from '../hospital-detail/hospital-detail';
import { NavController, ViewController, NavParams,PopoverController } from 'ionic-angular';


/*
  Generated class for the HospitalList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-hospital-list',
  templateUrl: 'hospital-list.html'
})
export class HospitalListPage {
  hos = ['', '', '', '', '', '', '', ''];
  constructor(public navCtrl: NavController, public vc: ViewController, public params: NavParams,public popoverCtrl: PopoverController) {
    console.log(navCtrl.canSwipeBack());
  }

  ionViewDidLoad() {
    console.log('Hello HospitalList Page');
  }

  ionViewWillEnter() {
    this.vc.setBackButtonText(this.params.get('BackText'));
  }

  showArea(myEvent){
    let popover = this.popoverCtrl.create(AreaPopoverPage);
    popover.present({
      ev: myEvent
    });
  }

  onHospitalClick(){

  }

}


@Component({
  template: `
    <div>筛选</div>
  `
})
export class AreaPopoverPage {
  constructor(public viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }
}
