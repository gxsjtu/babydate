import { Component } from '@angular/core';
import { HospitalDetailPage } from '../hospital-detail/hospital-detail';
import { NavController, ViewController, NavParams, PopoverController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { GlobalParameters } from '../../providers/global-parameters';
import {Converter} from '../../providers/converter';
import 'rxjs/Rx';
import * as Move from 'move-js';


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
  hospitals = [];
  allHospitals = [];
  searchKey = '';
  selectedArea = '全部';
  selectedLevel = '全部';
  areaName = '区县';
  levelName = '等级';
  constructor(public navCtrl: NavController, public vc: ViewController, public params: NavParams, public popoverCtrl: PopoverController, public gParameters: GlobalParameters, public http: Http, public converter: Converter, public loadingCtrl: LoadingController) {
    this.queryHospital();
  }

  getHosDetail(){
    this.navCtrl.push(HospitalDetailPage);
  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    this.vc.setBackButtonText(this.params.get('BackText'));
  }

  showArea(myEvent) {
    Move.default('#iconArea').rotate(180).end();
    let popover = this.popoverCtrl.create(AreaPopoverPage, {
      selectedArea: this.selectedArea,
      listPage: this
    });
    popover.onDidDismiss(() => {
      Move.default('#iconArea').rotate(360).end(() => {
        document.getElementById('iconArea').removeAttribute('style');
      });
    });
    popover.present({
      ev: myEvent
    });
  }

  showLevel(myEvent) {
    Move.default('#iconLevel').rotate(180).end();
    let popover = this.popoverCtrl.create(LevelPopoverPage, {
      selectedLevel: this.selectedLevel,
      listPage: this
    });
    popover.onDidDismiss(() => {
      Move.default('#iconLevel').rotate(360).end(() => {
        document.getElementById('iconLevel').removeAttribute('style');
      });
    });
    popover.present({
      ev: myEvent
    });
  }

  setArea(area) {
    this.selectedArea = area;
    if (area == "全部") {
      this.areaName = "区县";
    }
    else {
      this.areaName = area;
    }
    this.searchKey='';
    this.queryHospital();
  }

  setLevel(level) {
    this.selectedLevel = level;
    if (level == "全部") {
      this.levelName = "区县";
    }
    else {
      this.levelName = level;
    }
    this.searchKey='';
    this.queryHospital();
  }

  //取消事件，查询全部
  onCancel(event) {
    this.copyArray(this.hospitals, this.allHospitals);
  }

  //查找事件
  onSearch(event) {
    this.queryHospitalByName(this.searchKey);
  }

  //copy arr2 to arr1
  copyArray(arr1, arr2) {
    arr1.length = 0;
    arr2.forEach((o) => {
      arr1.push(Object.assign({}, o));
    });
  }

  //根据区县和等级查询医院
  queryHospital() {
    let loader = this.loadingCtrl.create({});
    loader.present();
    this.http.get(this.gParameters.SERVER + '/hospital/getAll/' + this.selectedArea + '/' + this.selectedLevel).map(res => res.json()).finally(() => {
      loader.dismiss();
    }).subscribe(data => {
      if (data.status == 0) {
        this.allHospitals = data.data;
        this.copyArray(this.hospitals, this.allHospitals);
      }
      else {
        //错误信息
      }
    }, error => {
      console.log(error);
    });
  }

  //根据医院名称查询
  queryHospitalByName(hospitalName) {
    this.hospitals = this.allHospitals.filter((h) => {
      return h.name.indexOf(hospitalName) > -1;
    });
  }

  goHospitalDetail(hospital){
    this.navCtrl.push(HospitalDetailPage,{
      BackText: '医院列表',
      Hospital:hospital
    });
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
