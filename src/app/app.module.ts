import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { HomePage } from '../pages/home/home';
import { OnboardPage } from '../pages/onboard/onboard';
import { HospitalListPage } from '../pages/hospital-list/hospital-list';
import { HospitalDetailPage } from '../pages/hospital-detail/hospital-detail';
import { HospitalMapPage } from '../pages/hospital-map/hospital-map';
import { GlobalParameters } from '../providers/global-parameters';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    OnboardPage,
    HomePage,
    HospitalListPage,
    HospitalDetailPage,
    HospitalMapPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'bottom',
      swipeBackEnabled: true,
      tabsHideOnSubPages: false,
      mode: 'ios'
    }),
    Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    OnboardPage,
    HomePage,
    HospitalListPage,
    HospitalDetailPage,
    HospitalMapPage
  ],
  providers: [GlobalParameters]
})
export class AppModule { }
