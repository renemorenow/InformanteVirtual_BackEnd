import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from './auth.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    titulo: string = '';
    isLogged: boolean = false;
    error: string = '';
    form: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private auth: AuthService,
        private fb: FormBuilder
        ) { }

        ngOnInit(){
            this.titulo = 'Login';
            this.auth.logOuth;
            this.crearControles();
        }

        crearControles(){
            this.form = this.fb.group({
                user: ['', Validators.required],
                pass: ['', Validators.required],
            })
        }

        Loggin(f){
            let token: string;
            this.auth.login(f).subscribe(rs => this.isLogged = rs,
                                        er => console.log(er),
                                        () => {
                                            if (this.isLogged) {
                                                this.goPagina();
                                            } else {
                                                this.error = 'error';
                                            }
                                        })
        }

        goPagina(){
            let link = ['/pagina'];
            this.router.navigate(link);
        }
}