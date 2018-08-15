import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


/*
  Generated class for the PlistarcasosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlistarcasosProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PlistarcasosProvider Provider');
  }

    obtenerdatos(){
      return this.http.get('https://apiadenunciarrnmc.policia.gov.co/wsInformante/api/InvestigationsWithFile');
    }

    GetInvestigation(Id:number){
      console.log('GetInvestigation: ' + Id);
      return this.http.get('https://apiadenunciarrnmc.policia.gov.co/wsInformante/api/Investigations/' + Id);
    }

  }
