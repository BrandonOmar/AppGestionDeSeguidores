import { Component, OnInit,ContentChild } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import {DatosAdmin} from '../models/datosAdmin.interface';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  showPassword = false;
  passwordToggleIcon = 'eye';

  email: string;
  password: string;

 db =firebase.firestore();

  arrayColeccionDatos: any = [{
    idFirebase: "",
    data: {} as DatosAdmin
   }];

  constructor(public router: Router, private authSvc: AuthService, private navCtrl: NavController, 
    private fb: FormBuilder, private afAuth: AngularFireAuth,public toastController: ToastController) { 

    }
  
    /**Método para mostrar y esconder contraseña en campo password */
    togglePassword() : void {
      this.showPassword = !this.showPassword;

      if(this.passwordToggleIcon == 'eye'){
        this.passwordToggleIcon = 'eye-off';
      }
      else
      {
        this.passwordToggleIcon = 'eye';
      }
    }

  ngOnInit() {
  }


  /** Método para validacion de campos vacíos y login del Administrador */
  bandera : boolean;
  async loginAdmin(email:string, password:string){
    this.bandera=false;
    if(email == null || email == undefined || email == ''){
      this.toastCorreo();
    }
    else{
      if(password == null || password == undefined || password == '' ){
        this.toastPassword();
      }
      else{
        this.db.collection("Administradores").get().then((querySnapshots) => {
          querySnapshots.forEach((doc) => {
    
            if(email == `${doc.data().email}` && password == `${doc.data().password}`){
              this.bandera = true;
              this.toastAdministradorValido();
              this.navCtrl.navigateForward('/administrador');
            }
            else{
              if(this.bandera == false){
                this.toastAdminInvalid();
              }
            }
           })
         });
      }
    }
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


  async toastCorreo() {
    const toast = await this.toastController.create({
      message: 'No se ha ingresado el correo',
      duration: 2000,
      color : 'danger',
      position : 'middle'
    });
    toast.present();
  }

  async toastPassword() {
    const toast = await this.toastController.create({
      message: 'No se ha ingresado la contraseña',
      duration: 2000,
      color : 'danger',
      position : 'middle'
    });
    toast.present();
  }

  async toastAdministradorValido() {
    const toast = await this.toastController.create({
      message: 'Bienvenido',
      duration: 2000,
      color : 'success',
      position : 'middle'
    });
    toast.present();
  }

  async toastAdminInvalid() {
    const toast = await this.toastController.create({
      message: 'Administrador no encontrado',
      duration: 2000,
      color : 'danger',
      position : 'middle'
    });
    toast.present();
  }



}
