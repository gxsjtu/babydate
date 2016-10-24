import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
declare var $: any;

/*
  Generated class for the IdentitySelect page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-identity-select',
  templateUrl: 'identity-select.html'
})
export class IdentitySelect {
canSelect = true;
imgWidth = 0;
selectDateText = "预产日期";
myDate = "2016-11-01";
constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    //console.log('Hello IdentitySelect Page');
  }

  selectPregnant(){
    this.imgWidth = $('#pregnant').width();
    if(this.canSelect)
    {
      this.selectDateText = "预产日期";
      this.canSelect = false;
      $("#text").animate({
        opacity:0
      },1000);
      $("#mother").animate({
        opacity: 0
      },1000,function(){
        let content = $("#content").width();
        let width = $('#pregnant').width()+ $('#pregnant').width()/4;
        let height = $("#content").height();
        let top = $("#rowPic").scrollTop();
        let marginTop = top - ((height - width - $("#rowDate").height()) / 2);
        let left = (content - width)/2;
        $("#pregnant").animate({
          marginLeft : left,
          marginTop : marginTop,
          width : width
        },1000,function(){
          $("#select").animate({
            opacity : 1
          },1000);
        })

      });
    }

  }

  selectMother(){
    if(this.canSelect)
    {
      this.selectDateText = "宝宝出生日期";
      this.canSelect = false;
      $("#text").animate({
        opacity:0
      },1000);
      $("#pregnant").animate({
        opacity: 0
      },1000,function(){
        let content = $("#content").width();
        let width = $('#mother').width()+ $('#mother').width()/4;
        let height = $("#content").height();
        let top = $("#rowPic").scrollTop();
        let marginTop = top - ((height - width - $("#rowDate").height()) / 2);
        let left = (content - width)/2 + $('#mother').width()/4;
        $("#mother").animate({
          marginLeft : '-='+left,
          marginTop : marginTop,
          width : width
        },1000,function(){
          $("#select").animate({
            opacity : 1
          },1000);
        })

      });
    }
  }

}
