import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { DescriptionPage } from '../pages/description/description';
import { ContributionsPage } from '../pages/contributions/contributions';

//Details
import { DetailsPage } from '../pages/details/details';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PlistarcasosProvider } from '../providers/plistarcasos/plistarcasos';
//import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

//Plugins
import { ImagePicker } from '@ionic-native/image-picker';

//Sample Upload
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { UploadfilePage } from '../pages/uploadfile/uploadfile';
import { InvestigationsfilterPage } from '../pages/Investigationsfilter/investigationsfilter';

import { AndroidPermissions } from '@ionic-native/android-permissions';

/* import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { Geolocation } from '@ionic-native/geolocation'; */

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    DescriptionPage,
    ContributionsPage,
    DetailsPage,
    UploadfilePage,
    InvestigationsfilterPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    DescriptionPage,
    ContributionsPage,
    DetailsPage,
    UploadfilePage,
    InvestigationsfilterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PlistarcasosProvider,
    ImagePicker,
    FileTransfer,
    FileTransferObject,
    File,
    Camera,
    AndroidPermissions
   
  ]
})
export class AppModule {
  //Inicio Localizacion
      /* const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 30,
      debug: true, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: false, // enable this to clear background location settings when the app terminates
      };

      this.backgroundGeolocation.configure(config)
      .subscribe((location: BackgroundGeolocationResponse) => {

      console.log(location);

      });

      // start recording location
      this.backgroundGeolocation.start();

      // If you wish to turn OFF background-tracking, call the #stop method.
      this.backgroundGeolocation.stop(); */
      //Fin Localizacion
}
