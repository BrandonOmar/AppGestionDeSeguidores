import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';
import {FormControl, FormGroup, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Paises } from '../models/pais.interface';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  ocultar1: boolean = false;

  defaultSelectedRadio = "radio_2";
  //Get value on ionChange on IonRadioGroup
  selectedRadioGroup:any;
  //Get value on ionSelect on IonRadio item
  selectedRadioItem:any;

  numEstrellas = '';
   
  arrayPaises: any = [{
    idFirebase: "",
    data: {} as Paises
   }];

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
        nombre : new FormControl('',Validators.required),
        estado : new FormControl(''),
        facebook : new FormControl('',Validators.required),
        email : new FormControl('',[Validators.required, Validators.email]),
        numtelefono : new FormControl('',[Validators.required, Validators.minLength(10)]),
        escuela : new FormControl('',Validators.required),
        respuesta1 : new FormControl(''),
        respuesta2 : new FormControl(''),
        respuesta3 : new FormControl(''),
        calificacion : new FormControl(''),
        comentario : new FormControl('',Validators.required),
        pais : new FormControl('',Validators.required)
      });
  }

  formDatosSeguidor : FormGroup;



  constructor(private router: Router, private service : AuthService, 
    public alertController: AlertController, public toastController: ToastController, private navCtrl: NavController, private platform:Platform) 
  {
    this.formDatosSeguidor = this.createFormGroup();


    this.service.consultarPaises("Paises").subscribe((resultadoConsultaDatos) => {
      this.arrayPaises = [];
      resultadoConsultaDatos.forEach((datos: any) => {
        
        this.arrayPaises.push({
          idFirebase: datos.payload.doc.id,
          data: datos.payload.doc.data()
        });
      })
    //   for (var i in this.arrayPaises) {
    //     console.log(this.arrayPaises[i].data.pais); 
    //  }
    });
  }

  accion1(paisSelect : string): void {

    if(paisSelect != 'México'){
      this.ocultar1 = false;
    }
    else{
      this.ocultar1 = true;
    }
  }

  ngOnInit() {
  }

  onResetForm()
  {
    this.formDatosSeguidor.reset();
  }

  addValue(cal : string): void {
    this.numEstrellas = cal;
  }

  onSaveForm()
  {
     if (this.formDatosSeguidor.valid){

       try {
         this.service.guardarDatosSeguidores(this.formDatosSeguidor.value, this.numEstrellas); 
         this.presentAlert();
         this.onResetForm();
       } 
       catch (error) {
         console.log('Error -> ', error)
       }
     }
     else{
       this.presentToast();
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
    this.navCtrl.navigateForward('/administrador');
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Debe llenar correctamente todos los campos.',
      duration: 2000,
      color : 'danger',
      position : 'middle'
    });
    toast.present();
  }

  logout()
    {
      this.router.navigate(['/decision']);
    }


}
