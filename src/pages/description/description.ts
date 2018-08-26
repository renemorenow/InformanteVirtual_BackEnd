import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { mobiscroll } from '@mobiscroll/angular';
import { AlertController } from 'ionic-angular';
import { PlistarcasosProvider } from '../../providers/plistarcasos/plistarcasos';
import { ContributionsPage } from '../contributions/contributions';

@IonicPage()
@Component({
  selector: 'page-description',
  templateUrl: 'description.html'
})
export class DescriptionPage {
  //formSettings = {
    //theme: 'material'
  //};
  idCaso
  investigation
  investigationFiles
  invFiles: any

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public provedor:PlistarcasosProvider) {    
    this.idCaso = navParams.get("idCaso");
  }

  ionViewDidLoad(){    
    //console.log('ionViewDidLoad: ' + this.idCaso);
    this.provedor.GetInvestigation(this.idCaso)
    .subscribe(
      (data)=>{this.investigation=data;},
      (error)=>{console.log(error);}
    )
    //console.log('ionViewDidLoad: ' + this.investigation);
    //debugger;
    this.provedor.GetInvestigationFiles(this.idCaso)
    .subscribe(
      (data)=>{this.investigationFiles=data;},
      (error)=>{console.log(error);}
    )
    var x = 0;
    console.log(this.investigationFiles);
    this.investigationFiles.forEach(element => {
      console.log(element.File_Doc);
      this.investigationFiles[x].File_Doc = this._arrayBufferToBase64(element.File_Doc);
      x = x + 1;
    });
  }

  _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }

  abrirAportes() {
    this.navCtrl.push(ContributionsPage, {
      idCaso: this.idCaso,
    });
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Señor Ciudadano',
      subTitle: 'Recuerde envié la información que considere relevante para el esclarecimiento de los hechos.',
      buttons: ['Enterado(a)']
    });
    alert.present();
  }

}
