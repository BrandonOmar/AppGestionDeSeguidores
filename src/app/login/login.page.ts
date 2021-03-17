import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(public router: Router, private authSvc: AuthService, private navCtrl: NavController, 
    private fb: FormBuilder, private afAuth: AngularFireAuth) { }


  ngOnInit() {
  }


  async onLoginGoogle() {

    try {
      const user = await this.authSvc.loginGoogle();
      if (user) {
        this.navCtrl.navigateForward('/decision');
      }
    } catch (error) {
      console.log("Error ->", error);
    }

  }

  async onLoginTwitter() {

    try {
      const user = await this.authSvc.loginTwitter();
      if (user) {
        this.navCtrl.navigateForward('/decision');
        alert("Tu nombre es: " + user.displayName + " Tu correo es: " + user.email);
      }
    } catch (error) {
      console.log("Error ->", error);
    }

  }
  async onLoginFacebook() {

    try {
      const user = await this.authSvc.loginFacebook();
      if (user) {
        this.navCtrl.navigateForward('/decision');
        alert("Tu nombre es: " + user.displayName + " Tu correo es: " + user.email);
      }
    } catch (error) {
      console.log("Error ->", error);
    }

  }

  async onLoginGithub() {

    try {
      const user = await this.authSvc.loginGithub();
      if (user) {
        console.log(user);
        this.navCtrl.navigateForward('/decision');
        alert("Tu nombre es: " + user.displayName + " Tu correo es: " + user.email);
      }
    } catch (error) {
      console.log("Error ->", error);
    }
  }


  admin(){
    this.navCtrl.navigateForward('/administrador');
  }


}
