import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { HomePage } from '../pages/home/home';
import { OnboardPage } from '../pages/onboard/onboard';
import { HospitalListPage } from '../pages/hospital-list/hospital-list';
import { GlobalParameters } from '../providers/global-parameters';

import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    OnboardPage,
    HomePage,
    HospitalListPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    OnboardPage,
    HomePage,
    HospitalListPage
  ],
  providers: [GlobalParameters]
})
export class AppModule { }
