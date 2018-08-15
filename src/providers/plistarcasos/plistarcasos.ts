import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

/*
  Generated class for the PlistarcasosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlistarcasosProvider {
  urlBaseService

  constructor(public http: HttpClient) {
    //console.log('Hello PlistarcasosProvider Provider');
    //this.urlBaseService = 'https://apiadenunciarrnmc.policia.gov.co/wsInformante';
    this.urlBaseService = 'https://catalogoservicioweb.policia.gov.co/wsInformante';
  }

  obtenerdatos() {
    return this.http.get(this.urlBaseService + "/api/InvestigationsWithFile"
    );
  }

  GetInvestigation(Id: number) {
    console.log("GetInvestigation: " + Id);
    return this.http.get(this.urlBaseService + "/api/Investigations/"+Id );
  }

  PostAddContributions(obj: Object) {
    console.log("obj: " + obj);
    let url: string = this.urlBaseService + "/api/Contributions";
    let headers: Object = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };

    this.http.post(url, obj).subscribe(
      data => {
        alert("Sus aportes fueron guardados satisfactoriamente");
        console.log("resultado: " + JSON.stringify(data));
      },
      error => {
        console.log(JSON.stringify(error.json()));
      }
    );
  }

  PostAddInformants(obj: any) {
    console.log(obj);
    let url: string = this.urlBaseService + "/api/Informants";
    let headers: Object = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };

    try {
      this.http.post(url, obj).subscribe(
        data => {
          console.log("PostAddInformants OK");
          console.log("resultado: " + JSON.stringify(data));
        },
        error => {
          console.log("PostAddInformants Error");
          console.log(JSON.stringify(error.json()));
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  PostAddContributionFile(obj: any) {
    console.log(obj);
    let url: string = this.urlBaseService + "/api/ContributionsFiles";
    let headers: Object = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };

    try {
      this.http.post(url, obj).subscribe(
        data => {
          alert("Sus aportes fueron guardados satisfactoriamente");
          console.log("resultado: " + JSON.stringify(data));
        },
        error => {
          console.log(JSON.stringify(error.json()));
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  GetLstInvestigationFiles(Id: number) {
    console.log("GetInvestigation: " + Id);
    return this.http.get(this.urlBaseService + "/api/LstInvestigationFiles/"+Id );
  }

  GetRowInvestigationFile(Id: number) {
    console.log("GetInvestigation: " + Id);
    return this.http.get(this.urlBaseService + "/api/RowInvestigationFile?id="+Id );
  }

}
