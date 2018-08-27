import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendinformationPage } from './sendinformation';

@NgModule({
  declarations: [
    SendinformationPage,
  ],
  imports: [
    IonicPageModule.forChild(SendinformationPage),
  ],
})
export class SendinformationPageModule {}
