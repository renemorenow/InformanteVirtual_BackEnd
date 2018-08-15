import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

/*
  Generated class for the PlistarcasosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlistarcasosProvider {
  constructor(public http: HttpClient) {
    //console.log('Hello PlistarcasosProvider Provider');
  }

  obtenerdatos() {
    return this.http.get(
      "https://apiadenunciarrnmc.policia.gov.co/wsInformante/api/InvestigationsWithFile"
    );
  }

  GetInvestigation(Id: number) {
    console.log("GetInvestigation: " + Id);
    return this.http.get(
      "https://apiadenunciarrnmc.policia.gov.co/wsInformante/api/Investigations/" +
        Id
    );
  }

  PostAddContributions(obj: Object) {
    console.log("obj: " + obj);
    let url: string =
      "https://apiadenunciarrnmc.policia.gov.co/wsInformante/api/Contributions";
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

  PostAddContributionFile(obj: any) {
    console.log(obj);
    let url: string =
      "https://apiadenunciarrnmc.policia.gov.co/wsInformante/api/Investigations/api/ContributionsFiles";
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
}
