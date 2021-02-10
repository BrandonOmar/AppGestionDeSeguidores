import { Injectable } from '@angular/core';
import { User } from '../shared/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import {AngularFirestore, AngularFirestoreDocument,AngularFirestoreCollection} from '@angular/fire/firestore'
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

<<<<<<< HEAD
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
//import { auth } from 'firebase';

=======
import {DatosI} from '../models/datosSeguidor.interface';
>>>>>>> fce09a5a4c65e18901d3a547aa6799a3c4aada8d

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private datosCollection : AngularFirestoreCollection<DatosI>;

  public user$: Observable<User>;

<<<<<<< HEAD
  constructor( private afAuth: AngularFireAuth, private afs: AngularFirestore, private fb:Facebook) { 
=======
  constructor( private afAuth: AngularFireAuth, private afs: AngularFirestore) 
  { 

    this.datosCollection = afs.collection<DatosI>('DatosSeguidores');
>>>>>>> fce09a5a4c65e18901d3a547aa6799a3c4aada8d

    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if(user){
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      } )
    );
  }

  guardarDatosSeguidores(newDatosSeguidor : DatosI): void
  {
    this.datosCollection.add(newDatosSeguidor);
  }



  async loginGoogle():Promise<User>{
    try {
      const { user } = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      this.updateUserData(user);
      return user;
    }
    catch (error){
      console.log('Error?',error)
    }
  }

  async logout(): Promise<void>{
    
    try {
      await this.afAuth.signOut();
  
    } catch (error) {
      console.log('Error->', error)
    }

  }


  private updateUserData(user : User)
  {

    const userRef : AngularFirestoreDocument<User> =  this.afs.doc(`users/${user.uid}`)

    const data: User = {

      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
    };

    return userRef.set(data, {merge: true});

  }

  isEmailVerified(user: User): boolean{

    return user.emailVerified === true ? true : false;
  }

  // async register(email: string, displayName: string): Promise<User> {

  //   try {
      
  //     const {user} = await this.afAuth(email,displayName);
  //     return user;

  //   } catch (error) {
  //     console.log('Error->', error)
  //   }

  // }

  //loginWithFacebook(){
    //return this.fb.login(['email', 'public_profile']).then( (response : FacebookLoginResponse) => {
      //const credential_fb = this.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
      //return this.afAuth.authState.signWithCredential(credential_fb);
    //})
  //}


}
