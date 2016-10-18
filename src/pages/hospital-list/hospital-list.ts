import { Component } from '@angular/core';
<<<<<<< Updated upstream
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { HospitalDetailPage } from '../hospital-detail/hospital-detail';
=======
import { NavController, ViewController, NavParams,PopoverController } from 'ionic-angular';
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
    this.navCtrl.push(HospitalDetailPage, {
      backText: '',
      address: '',
      district: '',
      level: '',
      description: ''
    })
=======
    // this.navCtrl.push('HospitalDetailPage', {
    //   backText: '',
    //   address: '',
    //   district: '',
    //   level: '',
    //   description: ''
    // })
>>>>>>> Stashed changes
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
