import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { HomePage } from '../pages/home/home';
import { OnboardPage } from '../pages/onboard/onboard';
import { HospitalListPage, AreaPopoverPage, LevelPopoverPage } from '../pages/hospital-list/hospital-list';
import { HospitalDetailPage } from '../pages/hospital-detail/hospital-detail';
import { HospitalMapPage } from '../pages/hospital-map/hospital-map';
import { GlobalParameters } from '../providers/global-parameters';
import { Ionic2RatingModule } from 'ionic2-rating';
import { InfoPage } from '../pages/info/info';
import { Converter } from '../providers/converter';
import { LoginPage} from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { SettingsPage } from '../pages/settings/settings';
import { AccompanyPage } from '../pages/accompany/accompany';
import { LoginStatus } from '../providers/login-status';
import { HospitalGalleryPage } from '../pages/hospital-gallery/hospital-gallery';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    OnboardPage,
    HomePage,
    HospitalListPage,
    HospitalDetailPage,
    HospitalMapPage,
    InfoPage,
    AreaPopoverPage,
    LevelPopoverPage,
    LoginPage,
    RegisterPage,
    SettingsPage,
    AccompanyPage,
    HospitalGalleryPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'bottom',
      swipeBackEnabled: true,
      tabsHideOnSubPages: false,
      iconMode: 'ios',
      mode: 'ios',
      canDisableScroll: false,
      backButtonText: '返回'
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
    HospitalMapPage,
    InfoPage,
    AreaPopoverPage,
    LevelPopoverPage,
    LoginPage,
    RegisterPage,
    SettingsPage,
    AccompanyPage,
    HospitalGalleryPage
  ],
  providers: [GlobalParameters, Converter, LoginStatus]
})
export class AppModule { }
