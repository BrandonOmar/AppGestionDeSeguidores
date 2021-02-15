import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(public router: Router, private authSvc: AuthService, private navCtrl: NavController, private fb: FormBuilder) { }


  ngOnInit() {
  }


  loginGoogle() {
    alert("Estás haciendo login con Google");
  }

  async onLoginGoogle() {

    try {
      const user = await this.authSvc.loginGoogle();
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        console.log("verified -> ", isVerified)
        this.redirectUser(isVerified);

        //  alert("Tu nombre es: "+ user.displayName+ " Tu correo es: "+ user.email);
        //  this.authSvc.register(user.email,user.displayName);

        //  alert("Tu nombre es: "+ user.displayName+ " Tu correo es: "+ user.email);
      }
    } catch (error) {
      console.log("Error ->", error);
    }

  }

  async onLoginTwitter() {

    try {
      const user = await this.authSvc.loginTwitter();
      if (user) {
        this.navCtrl.navigateForward('/formulario');
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
        this.navCtrl.navigateForward('/formulario');
        alert("Tu nombre es: " + user.displayName + " Tu correo es: " + user.email);
      }
    } catch (error) {
      console.log("Error ->", error);
    }

  }

  redirectUser(isVerified: boolean) {

    if (isVerified) {
      // location.href = "https://www.facebook.com/VolverASonarAC/?hc_ref=ARRwwR7nGp65IcQDKrJw5b4ig2EJrqJMj1o0j9CaoYgb_VYPoKU-8Cjz2PtnvFgqgjg&fref=nf&__xts__[0]=68.ARB_Kz7eNWaw93EBas2BkpMQSFgnnb2smvaqyWeR46Bm2WtHkn3LXPj7ZRiGXp4O7mgxYJ2BaCR4P5HosoFFPtG6m7nq9d6uHeDO018xYwv88kGRk39tYxLlA1elMhL06BYASJ_IMjz_uEYentXV3OIUFmXmVwOj8osnxIdFUTovPmSUIf0hv-7uWDUCAA4xXeWc-klxSFXKdhawVK1bCSvbFCEtpU3Psvx6XA2zeN0NSI5ZOJpUPph8YKRAfuRUgqsQECiB_ST6S39bhUoKpHdwmag9gG--M2IK-zbu2UQw45MPPFMcAFHZR1K33MArzeo&__tn__=kC-R";
      location.href = "https://www.facebook.com/somosrwr";
    }

  }




}
