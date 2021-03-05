import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';
import {FormControl, FormGroup} from '@angular/forms'
import { AlertController } from '@ionic/angular';
import {AngularFirestore, AngularFirestoreDocument,AngularFirestoreCollection} from '@angular/fire/firestore'
import {DatosI} from '../models/datosSeguidor.interface';


@Component({
  selector: 'app-detalle-seguidor',
  templateUrl: './detalle-seguidor.page.html',
  styleUrls: ['./detalle-seguidor.page.scss'],
})
export class DetalleSeguidorPage implements OnInit {

  seguidor: any;

  constructor(private db: AngularFirestore, private service: AuthService, private alert: AlertController) { }


  ngOnInit() {

    this.service.$getObjectSource.subscribe(data => {
     
      console.log(data);
      this.seguidor = data;

    }).unsubscribe();

  }


}
