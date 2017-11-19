import { Injectable, ViewChild } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { NavController } from "ionic-angular";
import { HomePage } from './../pages/home/home'

@Injectable()
export class AuthService {
    constructor(public afAuth: AngularFireAuth) {
    }


    signup(signupData) {
        return this.afAuth.auth.createUserWithEmailAndPassword(signupData.userEmail, signupData.userPassword)

    }

    saveLocalData(currentUid) {
        localStorage.setItem('token', currentUid);

    }

    login(loginData) {
        return this.afAuth.auth.signInWithEmailAndPassword(loginData.userEmail, loginData.userPassword)
    }


}
