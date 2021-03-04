import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';
import {FormControl, FormGroup} from '@angular/forms'
import { AlertController } from '@ionic/angular';
import {AngularFirestore, AngularFirestoreDocument,AngularFirestoreCollection} from '@angular/fire/firestore'
import {DatosI} from '../models/datosSeguidor.interface'



@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})

export class AdministradorPage implements OnInit {


  arrayColeccionDatos: any = [{
    id: "",
    data: {} as DatosI
   }];



    constructor(private db: AngularFirestore, private service: AuthService){

      this.obtenerListaTareas();
    }


    obtenerListaTareas(){
      this.service.consultar("DatosSeguidores").subscribe((resultadoConsultaDatos) => {
        this.arrayColeccionDatos = [];
        resultadoConsultaDatos.forEach((datos: any) => {
          this.arrayColeccionDatos.push({
            id: datos.payload.doc.id,
            data: datos.payload.doc.data()
          });
        })
      });
    }


    ngOnInit() {
    }
    
}