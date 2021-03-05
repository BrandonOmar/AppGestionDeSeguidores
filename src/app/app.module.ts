import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import {ReactiveFormsModule} from '@angular/forms'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore'
import { environment } from 'src/environments/environment';
import {AuthService} from './services/auth.service';

import { Facebook } from '@ionic-native/facebook/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//firebase config
//import { AngularFirestoreModule } from "@angular/fire/firestore"; //Modulo Firestore (BD)
//import { AngularFireAuthModule } from "@angular/fire/auth";  //Modulo de authenticacion
//import { AngularFireModule } from "@angular/fire";            //Modulo para inicializar y que todo funcione bien vergas
//import { firebaseConfig} from "../environments/environment";     // aqui se encuentra una variable de configuracion para inicializar firebase

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
   AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  
  ],
  providers: [
    Facebook,
    StatusBar,
    SplashScreen,
    AuthService,
    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
