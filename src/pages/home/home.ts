import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DescriptionPage } from '../description/description';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  abrirDescription() {
    this.navCtrl.push(DescriptionPage);
   }
}
