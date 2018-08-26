import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class PlistarcasosProvider {
  urlBaseService

  constructor(public http: HttpClient) {
    //console.log('Hello PlistarcasosProvider Provider');
    //this.urlBaseService = 'https://apiadenunciarrnmc.policia.gov.co/wsInformante';
    this.urlBaseService = 'https://catalogoservicioweb.policia.gov.co/wsInformante';
  }

  GetInvestigations() {
    return this.http.get(this.urlBaseService + "/api/Investigaciones/Investigations"
    );
  }

  GetInvestigationsWithFile() {
    return this.http.get(this.urlBaseService + "/api/Investigaciones/InvestigationsWithFile"
    );
  }

  GetInvestigation(Id: number) {
    //console.log("GetInvestigation: " + Id);
    return this.http.get(this.urlBaseService + "/api/Investigaciones/Investigation?Id="+Id);
  }
  
  GetInvestigationFiles(Id: number) {
    //console.log("GetInvestigationFiles: " + Id);
    //return this.http.get(this.urlBaseService + "/api/Investigaciones/InvestigationFiles?Id="+Id );
    return this.http.get("https://apiadenunciarrnmc.policia.gov.co/wsInformante/api/LstInvestigationFiles?id="+Id);
  }

  GetRowInvestigationFile(Id: number) {
    console.log("GetInvestigation: " + Id);
    //return this.http.get(this.urlBaseService + "/api/Investigaciones/RowInvestigationFile?Id="+Id );
    return this.http.get("https://apiadenunciarrnmc.policia.gov.co/wsInformante/api/RowInvestigationFile?id="+Id);
  }

  PostAddContributions(obj: Object) {
    let url: string = this.urlBaseService + "/api/Investigaciones/Contributions";
    //console.log("obj: " + obj);
    let response: any;
    let headers: Object = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };

    this.http.post(url, obj).subscribe(
      data => {
        response = JSON.stringify(data);
        alert("Sus aportes fueron guardados satisfactoriamente");
        console.log("resultado Contributions: " + JSON.stringify(data));
        return response;
      },
      error => {
        console.log(JSON.stringify(error.json()));
      }
    );
  }

  PostAddInformants(obj: any) {
    let url: string = this.urlBaseService + "/api/Investigaciones/Informants";
    //console.log(obj);
    let response: any;
    let headers: Object = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };

    try {
      this.http.post(url, obj).subscribe(
        data => {
          response = JSON.stringify(data);
          console.log("PostAddInformants OK");
          console.log("resultado: " + JSON.stringify(data));
          return response;
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
    let url: string = this.urlBaseService + "/api/Investigaciones/ContributionsFiles";
    //console.log(obj);
    let response: any;
    let headers: Object = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };

    try {
      this.http.post(url, obj).subscribe(
        data => {
          response = JSON.stringify(data);
          alert("Sus aportes fueron guardados satisfactoriamente");
          console.log("resultado: " + JSON.stringify(data));
          return response;
        },
        error => {
          console.log(JSON.stringify(error.json()));
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

}