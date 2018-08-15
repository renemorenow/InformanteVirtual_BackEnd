import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PlistarcasosProvider } from '../../providers/plistarcasos/plistarcasos';

@IonicPage()
@Component({
  selector: 'page-contributions',
  templateUrl: 'contributions.html',
})
export class ContributionsPage {
  resultContribution;
  resultContributionFile;
  objContrib: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public provider: PlistarcasosProvider) {
  }

  ionViewDidLoad() {
    this.presentAlert();    
  }
  
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Señor Ciudadano',
      subTitle: 'Recuerde envié la información que considere relevante para el esclarecimiento de los hechos.',
      buttons: ['Enterado(a)']
    });
    alert.present();
  }

  addContribution(id: string, txtDescription: string, txtFirstName: string, txtLastName: string, txtEmail: string, txtPhoneNumber: string){    
    let obj: Object  = {
    CONTRIBUTION_ID: 0,
    INVESTIGATION_ID: id,
    DESCRIPTION: txtDescription,
    INFORMANT_ID: 1
    }

    debugger;
    var resultado = this.provider.PostAddContributions(obj);
    
  }

  addContributionsFile(id: string, strArchivo: string){
    let obj: Object  = {
    CONTRIBUTION_FILE_ID: 0,
    CONTRIBUTION_ID: id,
    PATH: 'Documents',
    CONTENT_TYPE: 'image/jpeg',
    FILE_DOC: strArchivo
    }
    debugger;
    var resultado = this.provider.PostAddContributionFile(obj);
  }
}
