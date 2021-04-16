import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-seguidor',
  templateUrl: './detalle-seguidor.page.html',
  styleUrls: ['./detalle-seguidor.page.scss'],
})
export class DetalleSeguidorPage implements OnInit {

  seguidor: any;
  ocultar1: boolean = false;

  constructor(private service: AuthService, private router:Router) { }


  ngOnInit() {

    this.service.$getObjectSource.subscribe(data => {
     
      // console.log(data);
      this.seguidor = data;

      if(this.seguidor.data.estado === ''){
        this.ocultar1 = false;
      }
      else{
        this.ocultar1 = true;
      }

    }).unsubscribe();

  }

  logout()
    {
      this.router.navigate(['/administrador']);
    }


}
