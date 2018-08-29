import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PlistarcasosProvider } from '../../providers/plistarcasos/plistarcasos';
//import { Subscriber } from '../../../node_modules/rxjs/Subscriber';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-investigationsfilter',
  templateUrl: 'investigationsfilter.html',
})
export class InvestigationsfilterPage {
  casos;
  idCaso;
  idCrimen;
  p_State;
  p_City;
  constructor(public navCtrl: NavController, public navParams: NavParams, public provedor: PlistarcasosProvider) {    
    /* this.idCaso = navParams.get("idCaso");
    this.p_State = navParams.get("p_State");
    this.p_City = navParams.get("p_City"); */
  }
  ionViewDidLoad(){
    
  }
  ejecutarFiltro(_idCrimen: any, _p_State: any, _p_City: any){
    //alert(idCrimen);
    this.navCtrl.push(HomePage, {
      idCrimen: _idCrimen,
      p_State: _p_State,
      p_City: _p_City,
    });

  }
}
