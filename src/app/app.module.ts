import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { HomePage } from '../pages/home/home';
import { OnboardPage } from '../pages/onboard/onboard';
import { GlobalParameters } from '../providers/global-parameters';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    OnboardPage,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    OnboardPage,
    HomePage
  ],
  providers: [GlobalParameters]
})
export class AppModule { }
