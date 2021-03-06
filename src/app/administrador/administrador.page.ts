import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore'
import {DatosI} from '../models/datosSeguidor.interface';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})

export class AdministradorPage implements OnInit {

  item: any;
  
  seguidores : DatosI[] = [];
  textoBuscar = '';
  
  arrayColeccionDatos: any = [{
    idFirebase: "",
    data: {} as DatosI
   }];


   idSeguidorSelec: string;
   tareaEditando: DatosI;  


    constructor(private db: AngularFirestore, private service: AuthService, 
      private alert: AlertController, private router:Router, private navCtrl: NavController){

     
      this.service.consultarSeguidores("DatosSeguidores").subscribe((resultadoConsultaDatos) => {
        this.arrayColeccionDatos = [];
        resultadoConsultaDatos.forEach((datos: any) => {
          this.arrayColeccionDatos.push({
            idFirebase: datos.payload.doc.id,
            data: datos.payload.doc.data()
          });
        })
      });

    }

    buscarSeguidor(event){
      const texto = event.target.value;
      this.textoBuscar = texto;
    }

    async deleteSeguidor(item:any) {
      const alert =  await this.alert.create({
        header: '¿Está seguro de eliminar a éste seguidor?',
        message: 'Eliminación definitiva',
        buttons: [
          {
            text: 'Eliminar',
            role: 'eliminar',
            cssClass: 'btn-alert',
            handler: () => {
              this.service.eliminarSeguidor(item.idFirebase)
            }
            
          },
          {
            text: 'Cancelar',
            role: 'cancelar',
            cssClass: 'btn-alert',
            handler: () => {
              this.navCtrl.navigateForward('/administrador');
            }
            
          }
        ]
      });
      await alert.present();
      this.navCtrl.navigateForward('/administrador');

    }


    /** Mandar objeto a detalleSeguidor */

    detalleSeguidor(item:any) : void
    {
      this.service.sendObjectSource(item);
      this.router.navigate(['/detalle-seguidor']);
    }

    logout()
    {
      this.router.navigate(['/login']);
    }

    ngOnInit() {
    }


}