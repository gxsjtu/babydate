import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { UUID } from 'angular2-uuid';
import { Http } from '@angular/http';
import { GlobalParameters } from '../../providers/global-parameters';
declare const $: any;
declare const timeliner: any;
declare const Swiper: any;
import Promise from 'promise';


/*
  Generated class for the HospitalCard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-hospital-card',
  templateUrl: 'hospital-card.html'
})
export class HospitalCardPage {

  cards:any;
  dataList:any;
  methodList:any;
  loader:any;

  constructor(public navCtrl: NavController, public params: NavParams, public http: Http, public gParameters: GlobalParameters, public loadingCtrl: LoadingController) {
    this.loader = loadingCtrl.create();
    this.loader.present();
  }

  ionViewDidEnter() {
    $(document).ready(function() {
      $.timeliner({});
    });
  }

  ionViewWillEnter() {
    this.methodList=[];
    this.dataList = [];
    this.cards = this.params.get('cards');
    this.cards.sort((a:any,b:any) => {
      if (a.order < b.order) {
       return -1;
     } else if (a.order > b.order) {
       return 1;
     } else {
       return 0;
     }
    });
    this.cards.forEach((c)=>{
        c.imgs=[];
    });
    this.dataList = this.cards;
    var i=1;
    this.dataList.forEach((card) => {
      card.content.forEach((con) => {
        var ID = UUID.UUID()+ "0" + i;
        con.ex1ID = ID;
        con.ex2ID = ID + "EX";
        i++;
      });
      var imgIDs="";

      for(var j=0;j<card.images.length;j++)
      {
        imgIDs += card.images[j];
        if(j < (card.images.length - 1))
        {
          imgIDs += "|";
        }
      }
      card.imgIDs = imgIDs;
      this.methodList.push(this.loadHospitalImgs(card));
    });

    Promise.all(this.methodList).then(res => {
        new Swiper('.swiper-container', {
            slidesPerView: 'auto',
            centeredSlides: true,
            paginationClickable: false,
            spaceBetween: 20,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev'
        });
    }).catch(err => {
      console.log(err);
    }).done(() => {
      this.loader.dismiss();
    });
  }

  loadHospitalImgs(card) {
    return new Promise((resolve, reject) => {
      this.http.get(this.gParameters.SERVER+ '/hospital/getImageListByID/' + card.imgIDs).map(res => res.json()).subscribe(data => {
        if (data.status == 0) {
          card.imgs=data.data;
          resolve(data.data);
        }
        else {
          console.log(data);
        }
      }, error => {
        console.log(error);
      });
    });
  }

}
