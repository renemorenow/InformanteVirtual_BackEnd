import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DescriptionPage } from '../description/description';
import { PlistarcasosProvider } from '../../providers/plistarcasos/plistarcasos';
import { Subscriber } from '../../../node_modules/rxjs/Subscriber';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
casos
  constructor(public navCtrl: NavController, public provedor:PlistarcasosProvider) {

  }
  abrirDescription() {
    this.navCtrl.push(DescriptionPage);
  }

  ionViewDidLoad(){
    this.provedor.obtenerdatos( )
    .subscribe(
      (data)=>{this.casos=data;},
      (error)=>{console.log(error);}
    )
    
  }

}
