import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PlistarcasosProvider } from '../../providers/plistarcasos/plistarcasos';
import { Subscriber } from '../../../node_modules/rxjs/Subscriber';

import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { DetailsPage } from '../details/details';
import { Observable } from 'rxjs/Observable';

import { injectViewContainerRef } from '@angular/core/src/render3';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

@Injectable()
export class HomePage {
  casos;
  idCaso;
  idCrimen;
  p_State;
  p_City;

  private options;

  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public provedor: PlistarcasosProvider
              // private http: Http
              ) {
    // let token = localStorage.getItem('token');
    // let headers = new Headers({
    //   'Content-Type':'application/json',
    //   'Authorization':'Bearer ' + token
    // });
    this.idCrimen = navParams.get("idCrimen");
    this.p_State = navParams.get("p_State");
    this.p_City = navParams.get("p_City");
  }

  ionViewDidLoad(){
    /* this.provedor.GetInvestigationsWithFile( )
    .subscribe(
      (data)=>{
        this.casos=data;        
      },
      (error)=>{console.log(error);}
    ) */
    //Sin fotos
    if ((this.idCrimen != undefined) || (this.p_State != undefined) || (this.p_City != undefined)) {
      if ((this.idCrimen == undefined)) {
        this.idCrimen = "0";
      }
      if ((this.p_State == undefined)) {
        this.p_State = "0";
      }
      if ((this.p_City == undefined)) {
        this.p_City = "0";
      }
      this.provedor.GetInvestigationsFilter(this.idCrimen, this.p_State, this.p_City).subscribe(
      (data)=>{
        this.casos=data;
        this.casos.forEach(element => {
          element.File_Doc = "assets/imgs/inv_" + element.Investigation_Id + "_1.jpg";
        });
      },
      (error)=>{console.log(error);}
    )
    } else {
    this.provedor.GetInvestigations( )
    .subscribe(
      (data)=>{
        this.casos=data;
        this.casos.forEach(element => {
          element.File_Doc = "assets/imgs/inv_" + element.Investigation_Id + "_1.jpg";
          //console.log(element.File_Doc);
        });
      },
      (error)=>{console.log(error);}
    )
  }
  }
  abrirDescription(id) {
    /* console.log('abrirDescription: ' + id);
    this.navCtrl.push(DescriptionPage, {
      idCaso: id,
    }); */
    //console.log('DescriptionPage: ' + id);
    this.navCtrl.push(DetailsPage, {
      idCaso: id,
    });
  }
  obtenerImagen(id){
    console.log(id);
    if (id != null) {
      
      /* this.provedor.GetRowInvestigationFile(id)
      .subscribe(
        (data)=>{
          this.imagen=data[5];
          console.log(data[5]);
          return this.imagen;
        },
        (error)=>{console.log(error);}
      ); */
      return id;
    }
  }

}
