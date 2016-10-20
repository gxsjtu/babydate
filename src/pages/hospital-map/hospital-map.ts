import { Component } from '@angular/core';
import { GlobalParameters } from '../../providers/global-parameters';
import { NavController,NavParams } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

declare var BMap : any;
declare var BMapLib : any;
var BMAPLIB_TAB_SEARCH = 0,BMAPLIB_TAB_TO_HERE=1,BMAPLIB_TAB_FROM_HERE=2;
/*
  Generated class for the HospitalMap page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-hospital-map',
  templateUrl: 'hospital-map.html'
})
export class HospitalMapPage {

  hosAddress : any;
  end:any;
  start:any;
  endPoint:any;
  startPoint:any;
  mapT:any;
  currentCity:any;
  currentPoint:any;//获取当前point
  currentLongitude:any;//X
  currentLatitude:any;//Y

  constructor(public navCtrl: NavController, public gParameters: GlobalParameters, public params: NavParams) {

  }
  ionViewDidLoad() {
    console.log('Hello HospitalMap Page');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    let mapDiv = document.getElementById('mapDIV');
    mapDiv.style.width = document.body.clientWidth + 'px';
    mapDiv.style.height = document.body.clientWidth / this.gParameters.AD_MAIN_RATIO + 'px';
    this.hosAddress = this.params.get('HosAddress');
    this.getMap();
  }

  getMap(){
    var map = new BMap.Map('mapDIV');
    // var point = new BMap.Point(116.404,39.915);
    map.centerAndZoom("上海",11);

    var navigationControl = new BMap.NavigationControl({
      anchor: 'BMap_ANCHOR_TOP_LEFT',//位于左上角
      type: 'BMAP_NAVIGATION_CONTROL_LARGE',//large类型
      enableGeolocation:true//启用显示定位
    });
    map.addControl(navigationControl);

    var geolocationControl = new BMap.GeolocationControl();
    geolocationControl.addEventListener("locationSuccess",(e) => {
      map.clearOverlays();

      //定位成功事件
      // var address="";
      // address += e.addressComponent.province;
      // address += e.addressComponent.city;
      // address += e.addressComponent.district;
      // address += e.addressComponent.street;
      // address += e.addressComponent.streetNumber;
      // this.start = address;
      // this.startPoint = e.point;
      // //获取定位的当前城市
      //   var myGeo = new BMap.Geocoder();
      //   // 根据坐标得到地址描述
      //   myGeo.getLocation(e.point, (result) => {
      //       if (result) {
      //           this.currentCity = result.addressComponents.city;
      //           console.log(result);
      //       }
      //   });
      var searchInfoWindow = null;
      searchInfoWindow = new BMapLib.SearchInfoWindow(map,"搜索路线或周边",{
        title:"搜索",
        panel:"panel",
        enableAutoPan:true,
        searchTypes:[
          BMAPLIB_TAB_FROM_HERE,//从这里出发
          BMAPLIB_TAB_TO_HERE,
          BMAPLIB_TAB_SEARCH//周边检索
        ]
      });
      var marker = new BMap.Marker(e.point);

      // var label = new BMap.Label("您当前的位置",{offset:new BMap.Size(15,-10)});
      // marker.setLabel(label);
      // marker.enableDragging();//标记可拖拽
      marker.addEventListener("click",function(e){
        searchInfoWindow.open(marker);
      });
        map.addOverlay(marker);
    });
    geolocationControl.addEventListener("locationError",function(e){
      //定位失败
      alert(e.message);
    });

    map.addControl(geolocationControl);

    this.mapT = map;
    this.transitPlain();
  }

//步行路线规划
  walkingPlain(){
    Geolocation.getCurrentPosition().then((resp) => {
      this.currentLongitude = resp.coords.longitude;
      this.currentLatitude = resp.coords.latitude;

      var myGeo = new BMap.Geocoder();
        myGeo.getPoint(this.hosAddress, (point) => {
          if (point) {
          this.startPoint = new BMap.Point(this.currentLongitude, this.currentLatitude);
          this.endPoint = point;
          this.mapT.clearOverlays();
          var walking = new BMap.WalkingRoute(this.mapT, {renderOptions:{map: this.mapT, autoViewport: true}});
          walking.search(this.startPoint,this.endPoint);
      }
    },"上海");

    }).catch((error) => {
      console.log(error);
    });
  }

//驾车路线规划
  drivingPlain(){
    Geolocation.getCurrentPosition().then((resp) => {
      this.currentLongitude = resp.coords.longitude;
      this.currentLatitude = resp.coords.latitude;

      var myGeo = new BMap.Geocoder();
      myGeo.getPoint(this.hosAddress, (point) => {
        if (point) {
            this.endPoint = point;
            this.startPoint = new BMap.Point(this.currentLongitude, this.currentLatitude);
            this.mapT.clearOverlays();
            var driving = new BMap.DrivingRoute(this.mapT, {renderOptions:{map: this.mapT, autoViewport: true}});
            driving.search(this.startPoint,this.endPoint);
        }
      }, "上海");

    }).catch((error) => {
      console.log(error);
    });
  }

//公交路线
  transitPlain(){
    Geolocation.getCurrentPosition().then((resp) => {
      this.currentLongitude = resp.coords.longitude;
      this.currentLatitude = resp.coords.latitude;

      var myGeo = new BMap.Geocoder();
      myGeo.getPoint(this.hosAddress, (point) => {
          if (point) {
            this.startPoint = new BMap.Point(this.currentLongitude, this.currentLatitude);
            this.endPoint = point;
            this.mapT.clearOverlays();
            var transit = new BMap.TransitRoute(this.mapT, {renderOptions: {map: this.mapT}});
            transit.search(this.startPoint,this.endPoint);
        }
      },"上海");

    }).catch((error) => {
      console.log(error);
    });
  }

}
