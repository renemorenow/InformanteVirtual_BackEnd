import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { mobiscroll } from '@mobiscroll/angular';
import { AlertController } from 'ionic-angular';
import { PlistarcasosProvider } from '../../providers/plistarcasos/plistarcasos';
import { ContributionsPage } from '../contributions/contributions';

import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  idCaso
  investigation
  investigationFiles

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public provedor:PlistarcasosProvider) {
    this.idCaso = navParams.get("idCaso");
  }
  @ViewChild(Slides) slides: Slides;
  // ngAfterViewInit() {
  //   this.slides.freeMode = true;
  // }
  //DescriptionPage
  ionViewDidLoad(){
    this.provedor.GetInvestigation(this.idCaso)
    .subscribe(
      (data)=>{this.investigation=data;},
      (error)=>{console.log(error);}
    )
    this.provedor.GetInvestigationFiles(this.idCaso)
    .subscribe(
      (data)=>{
        this.investigation.File_Doc = data[0].FILE_DOC;
        this.investigationFiles=data;
        //console.log(this.investigationFiles);
      },
      (error)=>{console.log(error);}
    )    
  }
  

  abrirAportes() {
    this.navCtrl.push(ContributionsPage, {
      idCaso: this.idCaso,
    });
  }
  //Fin DescriptionPage

}