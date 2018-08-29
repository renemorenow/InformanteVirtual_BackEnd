import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CompileTemplateMetadata } from "@angular/compiler";

@Injectable()
export class PlistarcasosProvider {
  urlBaseService

  constructor(public http: HttpClient) {
    //this.urlBaseService = 'https://apiadenunciarrnmc.policia.gov.co/wsInformante';
    this.urlBaseService = 'https://catalogoservicioweb.policia.gov.co/wsInformante';
  }

  GetInvestigations() {
    return this.http.get(this.urlBaseService + "/api/Investigaciones/Investigations");
  }

  GetInvestigationsFilter(Id, p_State, p_City) {
    return this.http.get(this.urlBaseService + "/api/Investigaciones/LstInvestigationFilter?Id="+Id+"&p_State="+p_State+"&p_City="+p_City);
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
    return this.http.get(this.urlBaseService + "/api/Investigaciones/RowInvestigationFile?Id="+Id );
    // return this.http.get("https://apiadenunciarrnmc.policia.gov.co/wsInformante/api/RowInvestigationFile?id="+Id);
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
        let response1: any = JSON.stringify(data);
        response = response1.Contribution_Id;
        alert("Sus aportes fueron guardados satisfactoriamente");
        //console.log("resultado Contributions: " + JSON.stringify(data));
        console.log(response);
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
          response = data[0].Informant_Id;
          //console.log("resultado PostAddInformants: " + JSON.stringify(data[0].Informant_Id));
          console.log(response);
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
    console.log(obj);
    let response: any;
    let headers: Object = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };

    try {
      this.http.post(url, obj).subscribe(
        data => {
          response = data[0].Contribution_File_Id;
          //console.log(response);
          alert("Sus aportes fueron guardados satisfactoriamente");
          //console.log("resultado: " + JSON.stringify(data));
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

  PostAddInformantContribWithFile(objInformant: any, objContribution: any, objContributionFile: any) {
    let urlInformant: string = this.urlBaseService + "/api/Investigaciones/Informants";
    let urlContribution: string = this.urlBaseService + "/api/Investigaciones/Contributions";
    let urlContributionFile: string = this.urlBaseService + "/api/Investigaciones/ContributionsFiles";
    let response: any;

    if (objInformant != null) {
      this.http.post(urlInformant, objInformant).subscribe(
        data => {
          let objInformantResp: any = JSON.stringify(data);
          var value = objInformantResp.split(',')[0].split(':')[1];
          //console.log(value);
          var _Informant_Id = 1;
          if (value > 0) {
            _Informant_Id = value;
          }
          objContribution.Informant_Id = _Informant_Id;
          this.http.post(urlContribution, objContribution).subscribe(            
            data => {
              let objContributionResp: any = JSON.stringify(data);
              var value = objContributionResp.split(',')[0].split(':')[1];
              //console.log(value);
              var _Contribution_Id = 1;
              if (value > 0) {
                _Contribution_Id = value;
              }
              objContributionFile.Contribution_Id = _Contribution_Id;
              if (_Contribution_Id > 0) {
                this.http.post(urlContributionFile, objContributionFile).subscribe(
                  data => {
                    let response2: any = JSON.stringify(data);
                    var value = response2.split(',')[0].split(':')[1];
                    response = value;
                    alert("Sus aportes fueron guardados satisfactoriamente.");
                    return response;
                  },
                  error => {
                    console.log(JSON.stringify(error.json()));
                  }
                );
              }              
              return response;
            },
            error => {
              console.log(JSON.stringify(error.json()));
            }
          );
        },
        error => {
          console.log("PostAddInformants Error");
          console.log(JSON.stringify(error.json()));
        }
      );
    } else {
    this.http.post(urlContribution, objContribution).subscribe(
      data => {
        let objContributionResp: any = JSON.stringify(data);
              var value = objContributionResp.split(',')[0].split(':')[1];
              //console.log(value);
              var _Contribution_Id = 1;
              if (value > 0) {
                _Contribution_Id = value;
              }
              objContributionFile.Contribution_Id = _Contribution_Id;
        if (_Contribution_Id > 0) {
          this.http.post(urlContributionFile, objContributionFile).subscribe(
            data => {
              let response2: any = JSON.stringify(data);
              var value = response2.split(',')[0].split(':')[1];
              response = value;
              alert("Sus aportes fueron guardados satisfactoriamente.");
              return response;
            },
            error => {
              console.log(JSON.stringify(error.json()));
            }
          );
        }
        
        return response;
      },
      error => {
        console.log(JSON.stringify(error.json()));
      }
    );
  }

  }

  PostAddInformantContrib(objInformant: any, objContribution: any) {
    let urlInformant: string = this.urlBaseService + "/api/Investigaciones/Informants";
    let urlContribution: string = this.urlBaseService + "/api/Investigaciones/Contributions";
    let response: any;
    let objInformantResp: any = {
      Informant_Id: 1,
      First_Name: null,
      Last_Name: null,
      Email: null,
      Phone_Number: null
      }

    if (objInformant != null) {
      this.http.post(urlInformant, objInformant).subscribe(
        data => {
          objInformantResp = JSON.stringify(data);
          var value = objInformantResp.split(',')[0].split(':')[1];
          //console.log(value);
          var _Informant_Id = 1;
          if (value > 0) {
            _Informant_Id = value;
          }
          objContribution.Informant_Id = _Informant_Id;
          this.http.post(urlContribution, objContribution).subscribe(            
            data => {
              let response1: any = JSON.stringify(data);
              var value = objInformantResp.split(',')[0].split(':')[1];
              response = value;
              return response;
            },
            error => {
              console.log(JSON.stringify(error.json()));
            }
          );
        },
        error => {
          console.log("PostAddInformantContrib Error");
          console.log(JSON.stringify(error.json()));
        }
      );
    }
  
  }

}