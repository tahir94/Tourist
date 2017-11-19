import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs";
import { HomePage } from "../home/home";
import { AuthService } from "../../provider/auth";
import { EmailValidator } from '../../validators/email';



@IonicPage()
@Component({
	selector: 'page-signup',
	templateUrl: 'signup.html',
})
export class SignupPage {

	signupForm: FormGroup;

	constructor(private fb: FormBuilder,
		private navCtrl: NavController,
		private authService: AuthService) {
		this.signupForm = this.fb.group({

			userName: [null, Validators.required],
			userEmail: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
			userPassword: [null, Validators.compose([Validators.minLength(6), Validators.required])]
		})
	}

	signup() {

		this.authService.signup(this.signupForm.value).then(success => {
			// console.log(success);
			if (success) {
				this.authService.saveLocalData(success.uid)
				this.navCtrl.push(HomePage)
			}
		}).catch(err => {
			// console.log(err);
		}
			)
		this.signupForm.reset();
	}
	ionViewDidLoad() {
		// console.log('ionViewDidLoad SignupPage');
	}

}
