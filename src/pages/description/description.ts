import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { mobiscroll } from '@mobiscroll/angular';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-description',
  templateUrl: 'description.html'
})
export class DescriptionPage {
  //formSettings = {
    //theme: 'material'
  //};

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {

  }  

  showAlert() {
    debugger;
    mobiscroll.alert({
        title: 'Señor Ciudadano',
        message: '"Recuerde"envié la información que considere relevante para el esclarecimiento de los hechos.',
        callback: function () {
            mobiscroll.toast({
                message: 'Alert closed'
            });
        }
    });
  } 
  
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Señor Ciudadano',
      subTitle: 'Recuerde envié la información que considere relevante para el esclarecimiento de los hechos.',
      buttons: ['Enterado']
    });
    alert.present();
  }

}
