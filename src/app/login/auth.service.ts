import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService{
    UserName: string;
    loggedIn: boolean;
    url = 'https://apiadenunciarrnmc.policia.gov.co/ponal_api/usuario/ciudadano/token';

    constructor(private Http: Http){
        this.UserName = '';
        this.loggedIn = false;
    }

    login(userInfo){
        let url = `${this.url}/usuario/ciudadano/token`;        
        let iJson = JSON.stringify(userInfo);

        return this.Http.post(url, iJson, {headers: new Headers({'Content-Type':'application/json'})})
                        .map(res => res.text())
                        .map(res => {
                            if(res == 'error' || res == 'nofound') {
                                this.loggedIn = false;
                            } else {
                                localStorage.setItem('token',res);this.UserName = userInfo.user; this.loggedIn = true;
                            }
                            return this.loggedIn;
                        });
    }

    logOuth(): void{
        localStorage.removeItem('token');
        this.UserName = '';
        this.loggedIn = false;
    }

    isLoggedIn(){
        return this.loggedIn;
    }

}
