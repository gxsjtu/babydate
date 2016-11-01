import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import ProgressBar from 'progressbar.js';

/*
  Generated class for the HospitalPackage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-hospital-package',
  templateUrl: 'hospital-package.html'
})
export class HospitalPackagePage {

    per: any;
    packages: any;
    cardList: any;
    packageList: any;
    babyList: any;
    baseNum: any;//百分比
    perNum: any;
    linePro: any;
    allList: any;

  constructor(public navCtrl: NavController, public params: NavParams) {

  }

  ionViewWillEnter() {
    this.allList = [];
    this.packages = this.params.get('packages');
    this.cardList = this.packages[0].items;
    this.packageList = this.packages[1].items;
    this.babyList = this.packages[2].items;
    this.allList = this.cardList.concat(this.packageList).concat(this.babyList);
    // console.log('alllist');
    // console.log(this.allList);

    var cardNum = this.cardList.filter((c) => {
        return c.isOptional;
    }).length;
    var packageNum = this.packageList.filter((p) => {
        return p.isOptional;
    }).length;
    var babyNum = this.babyList.filter((b) => {
        return b.isOptional;
    }).length;
    this.perNum = (100/29)/100;
    this.baseNum = this.perNum * (packageNum + cardNum + babyNum);
  }

  ionViewDidEnter() {
    var line = new ProgressBar.Line('#box',
    {
      color:'#fafafa',
      trailColor:'#f15ea2',
      trailWidth:1,
      // strokeWidth:0.8,
      svgStyle:{width: '100%', height: '100%'},
      text: {
        style: {
            color: '#f15ea2',
            position: 'absolute',
            left: '50%',
            top: '40px',
            padding: 0,
            margin: 0,
            transform: null
          },
          autoStyleContainer: false
        },
      step:(state,line) => {
        var onlyList = this.allList.filter((p) => {
          return p.isOptional == false;
        });
        if(onlyList.length <= 0)
        {
          line.setText("100%");
        }
        else
        {
        var num = this.baseNum * 100;
        line.setText(parseInt(String(num)) + "%");
        }
      }
    });
    line.animate(this.baseNum, {
      duration: 800,
       step: function(state, circle, attachment) {
        circle.path.setAttribute('stroke-width','0.6');
        circle.path.setAttribute('d','M 0.3,0.5 L 99.7,0.5');
    }
    }, function() {
      console.log('Animation has finished');
    });

    this.linePro = line;
  }

  checkCard(card){
    if(card.isOptional)
    {
      this.baseNum = this.baseNum - this.perNum;
    }
    else{
      this.baseNum = this.baseNum + this.perNum;
    }

      this.linePro.animate(this.baseNum, {
        duration: 800
      }, function() {
        console.log('Animation has finished');
      });

      card.isOptional = !card.isOptional;

  }
  checkPackage(p){
    if(p.isOptional)
    {
      this.baseNum = this.baseNum - this.perNum;
    }
    else{
      this.baseNum = this.baseNum + this.perNum;
    }
    p.isOptional = !p.isOptional;

      this.linePro.animate(this.baseNum, {
        duration: 800
      }, function() {
        console.log('Animation has finished');
      });
  }
  checkBaby(baby){
    if(baby.isOptional)
    {
      this.baseNum = this.baseNum - this.perNum;
    }
    else{
      this.baseNum = this.baseNum + this.perNum;
    }
    baby.isOptional = !baby.isOptional;

      this.linePro.animate(this.baseNum, {
        duration: 800
      }, function() {
        console.log('Animation has finished');
      });
  }
}
