import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';
import {FormControl, FormGroup} from '@angular/forms'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {


  createFormGroup()
  {
    return new FormGroup(
      {
        nombre : new FormControl(''),
        edad : new FormControl(''),
        calificacion : new FormControl(''),
        comentario : new FormControl('')
      });
  }

  formDatosSeguidor : FormGroup;

  constructor(private router: Router, private service : AuthService, public alertController: AlertController) 
  {
    this.formDatosSeguidor = this.createFormGroup();
  }

  ngOnInit() {
  }

  onResetForm()
  {
    this.formDatosSeguidor.reset();
  }

  onSaveForm()
  {
    try {

      this.service.guardarDatosSeguidores(this.formDatosSeguidor.value); 
      this.presentAlert();
      this.onResetForm();
    } 
    catch (error) {
      console.log('Error -> ', error)
    }
       
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      translucent : true,
      header: 'Mensaje',
      message: 'Datos guardados correctamente',
      buttons: ['OK']
    });

    await alert.present();
  }


}
