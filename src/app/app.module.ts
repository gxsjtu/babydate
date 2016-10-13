import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { OnboardPage } from '../pages/onboard/onboard';
import { GlobalParameters } from '../providers/global-parameters';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    OnboardPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    OnboardPage
  ],
  providers: [GlobalParameters]
})
export class AppModule { }
