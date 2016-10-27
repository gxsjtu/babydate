import { Component } from '@angular/core';
import { GlobalParameters } from '../../providers/global-parameters';
import { NavController,NavParams } from 'ionic-angular';
import { Geolocation, LocationAccuracy } from 'ionic-native';

declare var BMap : any;
declare var BMapLib : any;
var BMAPLIB_TAB_SEARCH = 0,BMAPLIB_TAB_TO_HERE=1,BMAPLIB_TAB_FROM_HERE=2,BMAP_STATUS_SUCCESS=0;
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
  endPoint:any;
  startPoint:any;
  mapT:any;
  currentCity:any;
  currentPoint:any;//获取当前point
  currentLongitude:any;//X
  currentLatitude:any;//Y
  planRes:any;
  carTime:any;
  transitTime:any;
  walkTime:any;
  tabHeight: any;
  headerHeight: any;

  constructor(public navCtrl: NavController, public gParameters: GlobalParameters, public params: NavParams) {
      this.carTime = "驾车";
      this.transitTime = "公交";
      this.walkTime = "步行";
  }

  ionViewDidEnter() {
    LocationAccuracy.canRequest().then((canRequest: boolean) => {
      if(canRequest)
      {
          LocationAccuracy.request(LocationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => {
            console.log('suc');
          }, (err) => {
            console.log('err');
          });
      }
    });

    let mapDiv = document.getElementById('mapDIV');
    var tabs = document.getElementsByTagName('ion-tabs')[0].getElementsByTagName('div')[0];
    var headerEl = document.getElementsByTagName('ion-header')[3];
    this.tabHeight = tabs.clientHeight;
    this.headerHeight = headerEl.clientHeight;
    mapDiv.style.width = document.body.clientWidth + 'px';
    mapDiv.style.height = (document.body.clientHeight - this.tabHeight - this.headerHeight) + 'px';
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
    var elCar = document.getElementById("carEl");
    var elBus = document.getElementById("busEl");
    var elMan = document.getElementById("manEl");
    elMan.style.color = '#FFB90F';
    elBus.style.color = 'black';
    elCar.style.color = 'black';
    Geolocation.getCurrentPosition().then((resp) => {
      this.currentLongitude = resp.coords.longitude;
      this.currentLatitude = resp.coords.latitude;

      var myGeo = new BMap.Geocoder();
        myGeo.getPoint(this.hosAddress, (point) => {
          if (point) {
          this.startPoint = new BMap.Point(this.currentLongitude, this.currentLatitude);
          this.endPoint = point;
          this.mapT.clearOverlays();
          var walkingComplete = (results) => {
            if(walking.getStatus() != BMAP_STATUS_SUCCESS){
              return;
            }
            var plan = results.getPlan(0);
            this.carTime = "驾车";
            this.transitTime = "公交";
            // var elCar = document.getElementById("carEl");
            // var elBus = document.getElementById("busEl");
            // var elMan = document.getElementById("manEl");
            // elMan.style.color = '#FFB90F';
            // elBus.style.color = 'black';
            // elCar.style.color = 'black';
            this.walkTime = this.convertTime(plan.getDuration(true));
          }
          var walking = new BMap.WalkingRoute(this.mapT, {renderOptions:{map: this.mapT,panel:"resultDiv", autoViewport: true}, policy: "BMAP_DRIVING_POLICY_LEAST_TIME", onSearchComplete: walkingComplete});
          walking.search(this.startPoint,this.endPoint);
      }
    },"上海");

    }).catch((error) => {
      console.log(error);
    });
  }

//驾车路线规划
  drivingPlain(){
    var elCar = document.getElementById("carEl");
    var elBus = document.getElementById("busEl");
    var elMan = document.getElementById("manEl");
    elCar.style.color = '#FFB90F';
    elBus.style.color = 'black';
    elMan.style.color = 'black';
    Geolocation.getCurrentPosition().then((resp) => {
      this.currentLongitude = resp.coords.longitude;
      this.currentLatitude = resp.coords.latitude;

      var myGeo = new BMap.Geocoder();
      myGeo.getPoint(this.hosAddress, (point) => {
        if (point) {
            this.endPoint = point;
            this.startPoint = new BMap.Point(this.currentLongitude, this.currentLatitude);
            this.mapT.clearOverlays();
            var drivingComplete = (results) => {
              if(driving.getStatus() != BMAP_STATUS_SUCCESS){
                return;
              }
              var plan = results.getPlan(0);
              this.transitTime = "公交";
              this.walkTime = "步行";
              // var elCar = document.getElementById("carEl");
              // var elBus = document.getElementById("busEl");
              // var elMan = document.getElementById("manEl");
              // elCar.style.color = '#FFB90F';
              // elBus.style.color = 'black';
              // elMan.style.color = 'black';
              this.carTime = this.convertTime(plan.getDuration(true));
            }
            var driving = new BMap.DrivingRoute(this.mapT, {renderOptions:{map: this.mapT,panel:"resultDiv", autoViewport: true}, policy: "BMAP_DRIVING_POLICY_LEAST_TIME", onSearchComplete: drivingComplete});
            driving.search(this.startPoint,this.endPoint);
        }
      }, "上海");

    }).catch((error) => {
      console.log(error);
    });
  }

//公交路线
  transitPlain(){
    var elCar = document.getElementById("carEl");
    var elBus = document.getElementById("busEl");
    var elMan = document.getElementById("manEl");
    elBus.style.color = '#FFB90F';
    elCar.style.color = 'black';
    elMan.style.color = 'black';
    Geolocation.getCurrentPosition().then((resp) => {
      this.currentLongitude = resp.coords.longitude;
      this.currentLatitude = resp.coords.latitude;
      var myGeo = new BMap.Geocoder();
      myGeo.getPoint(this.hosAddress, (point) => {
          if (point) {
            this.startPoint = new BMap.Point(this.currentLongitude, this.currentLatitude);
            this.endPoint = point;
            this.mapT.clearOverlays();
            var transitComplete = (results) => {
              if(transit.getStatus() != BMAP_STATUS_SUCCESS){
                return;
              }
              var plan = results.getPlan(0);
              this.carTime = "驾车";
              this.walkTime = "步行";
              // var elCar = document.getElementById("carEl");
              // var elBus = document.getElementById("busEl");
              // var elMan = document.getElementById("manEl");
              // elBus.style.color = '#FFB90F';
              // elCar.style.color = 'black';
              // elMan.style.color = 'black';
              this.transitTime = this.convertTime(plan.getDuration(true));
            }
            var transit = new BMap.TransitRoute(this.mapT, {renderOptions: {map: this.mapT, panel:"resultDiv"}, policy: "BMAP_DRIVING_POLICY_LEAST_TIME", onSearchComplete: transitComplete});
            transit.search(this.startPoint,this.endPoint);

        }
      },"上海");

    }).catch((error) => {
      console.log(error);
    });
  }

  convertTime(timeStr){
    var index = timeStr.indexOf('小时');
    var indexOfMin = timeStr.indexOf('分');
    if(index > 0)
    {
      var hour = timeStr.substring(0,index);
      var idx = timeStr.indexOf('时');
      var min = timeStr.substring((idx + 1), indexOfMin);
      var totalMin = (hour * 60) + parseInt(min);
      return totalMin + "分";
    }
    else{
      var min = timeStr.substring(0,(indexOfMin + 1));
      return min;
    }
  }

  disPlanRes(){
    var resDiv = document.getElementById('resultDiv');
    if(resDiv.style.display == 'block' || resDiv.style.display == '')//当前是显示状态
    {
      resDiv.style.display = 'none';
      let mapDiv = document.getElementById('mapDIV');
      mapDiv.style.height = (document.body.clientHeight - this.tabHeight - this.headerHeight) + 'px';
    }
    else{
      let mapDiv = document.getElementById('mapDIV');
      mapDiv.style.height = (document.body.clientHeight - this.tabHeight - this.headerHeight)/2 + 'px';
      resDiv.style.display = 'block';
    }
  }

}
