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

import { AndroidPermissions } from '@ionic-native/android-permissions';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    DescriptionPage,
    ContributionsPage,
    DetailsPage,
    UploadfilePage
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
    UploadfilePage
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
export class AppModule {}
