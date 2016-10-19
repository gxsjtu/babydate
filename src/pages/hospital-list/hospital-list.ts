import { Component } from '@angular/core';
import { HospitalDetailPage } from '../hospital-detail/hospital-detail';
import { NavController, ViewController, NavParams, PopoverController } from 'ionic-angular';
import * as Bounce from 'bounce.js';


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
  searchKey = "";
  selectedArea = "全部";
  selectedLevel = "全部";
  constructor(public navCtrl: NavController, public vc: ViewController, public params: NavParams, public popoverCtrl: PopoverController) {
    console.log(navCtrl.canSwipeBack());
    this.queryHospital();
  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    this.vc.setBackButtonText(this.params.get('BackText'));
  }

  showArea(myEvent) {
    console.log(this);
    let popover = this.popoverCtrl.create(AreaPopoverPage, {
      selectedArea: this.selectedArea,
      listPage: this
    });
    popover.present({
      ev: myEvent
    });
  }

  showLevel(myEvent) {
    let popover = this.popoverCtrl.create(LevelPopoverPage, {
      selectedLevel: this.selectedLevel,
      listPage: this
    });
    popover.present({
      ev: myEvent
    });
  }

  onHospitalClick() {

  }

  setArea(area) {
    this.selectedArea = area;
    this.queryHospital();
  }

  setLevel(level) {
    this.selectedLevel = level;
    this.queryHospital();
  }

  onCancel(event) {
    console.log('cancel');
  }

  onSearch(event) {
    alert('search');
  }

  queryHospital() {
    console.log(this.selectedArea + " " + this.selectedLevel);
  }

}


@Component({
  template: `
    <ion-list>
      <ion-item *ngFor="let area of areaDatas" (click)="areaSelected(area)">
        <a>{{area}}<ion-icon *ngIf="area == selectedArea" style="float:right;" name="checkmark"></ion-icon></a>
      </ion-item>
    </ion-list>
  `
})
export class AreaPopoverPage {
  areaDatas = [
    "全部",
    "浦东新区",
    "徐汇区",
    "黄浦区",
    "卢湾区",
    "静安区",
    "长宁区",
    "闵行区",
    "杨浦区",
    "普陀区",
    "虹口区",
    "宝山区",
    "闸北区",
    "松江区",
    "嘉定区",
    "青浦区",
    "奉贤区",
    "金山区",
    "崇明县"
  ];
  selectedArea: string;
  listPage: HospitalListPage;
  constructor(public viewCtrl: ViewController, public navParams: NavParams) { }

  ngOnInit() {
    if (this.navParams.data) {
      this.selectedArea = this.navParams.data.selectedArea;
      this.listPage = this.navParams.data.listPage;
    }
  }

  close() {
    this.viewCtrl.dismiss();
  }

  areaSelected(area) {
    this.selectedArea = area;
    this.listPage.setArea(area);
    this.close();
  }
}

@Component({
  template: `
    <ion-list>
      <ion-item *ngFor="let level of levelDatas" (click)="levelSelected(level)">
        <a>{{level}}<ion-icon *ngIf="level == selectedLevel" style="float:right;" name="checkmark"></ion-icon></a>
      </ion-item>
    </ion-list>
  `
})
export class LevelPopoverPage {
  levelDatas = [
    "全部",
    "三级特等",
    "三级甲等",
    "三级乙等",
    "三级丙等",
    "二级甲等",
    "二级乙等",
    "二级丙等",
    "一级甲等",
    "一级乙等",
    "一级丙等",
    "私立医院"
  ];
  selectedLevel: string;
  listPage: HospitalListPage;
  constructor(public viewCtrl: ViewController, public navParams: NavParams) { }

  ngOnInit() {
    if (this.navParams.data) {
      this.selectedLevel = this.navParams.data.selectedLevel;
      this.listPage = this.navParams.data.listPage;
    }
  }

  close() {
    this.viewCtrl.dismiss();
  }

  levelSelected(level) {
    this.selectedLevel = level;
    this.listPage.setLevel(level);
    this.close();
  }
}
