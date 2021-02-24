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

  defaultSelectedRadio = "radio_2";
  //Get value on ionChange on IonRadioGroup
  selectedRadioGroup:any;
  //Get value on ionSelect on IonRadio item
  selectedRadioItem:any;

  radio_list = [
    {
      id: '1',
      name: 'radio_list',
      value: 'Si',
      text: 'Si',
      disabled: false,
      checked: false,
      color: 'success'
    }, {
      id: '2',
      name: 'radio_list',
      value: 'No',
      text: 'No',
      disabled: false,
      checked: true,
      color: 'danger'
    },
  ];


  createFormGroup()
  {
    return new FormGroup(
      {
        respuesta1 : new FormControl(''),
        respuesta2 : new FormControl(''),
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
