import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(public router: Router, private authSvc: AuthService) { }

  ngOnInit() {
  }

  loginGoogle()
  {
    alert("Estás haciendo login con Google");
  }

  async onLoginGoogle()
  {
    
    try {
      const user = await this.authSvc.loginGoogle();
      if(user){
        const isVerified =  this.authSvc.isEmailVerified(user);
        console.log("verified -> ", isVerified)
        this.redirectUser(isVerified);
      //  alert("Tu nombre es: "+ user.displayName+ " Tu correo es: "+ user.email);
      //  this.authSvc.register(user.email,user.displayName);
      }
    } catch (error) {
      console.log("Error ->" , error);
    }


  }


  redirectUser(isVerified: boolean){

    if(isVerified){
       location.href = "https://www.facebook.com/VolverASonarAC/";
     // location.href = "http://www.vuelveasoñar.org";
    }

  }

}
