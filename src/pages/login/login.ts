import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Http, Headers } from "@angular/http";
import { HomePage } from "../home/home";
import { SignupPage } from "../signup/signup";
import { EmailValidator } from '../../validators/email';
import { AuthService } from "../../provider/auth";

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})

export class LoginPage {

    loginForm: FormGroup;
    constructor(private fb: FormBuilder,
        private navCtrl: NavController, private authService: AuthService) {

        this.loginForm = this.fb.group({
            // userEmail : '',
            // userPassword : ''
            userEmail: [null, Validators.compose([Validators.required, EmailValidator.isValid])],
            userPassword: [null, Validators.compose([Validators.minLength(6), Validators.required])]
        })
    }

    login() {

        this.authService.login(this.loginForm.value).then(success => {

            if (success) {
                this.authService.saveLocalData(success.uid);
                this.navCtrl.push(HomePage)
            }

        }).catch(error => {


        })
        this.loginForm.reset()
    }
    goToSignup() {
        this.navCtrl.push(SignupPage)
    }

    ionViewDidLoad() {
        let token = localStorage.getItem('token');
        if (token) {
            this.navCtrl.push(HomePage)
        }
    }

}
