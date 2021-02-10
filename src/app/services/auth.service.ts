import { Injectable } from '@angular/core';
import { User } from '../shared/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore'
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
//import { auth } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: Observable<User>;

  constructor( private afAuth: AngularFireAuth, private afs: AngularFirestore, private fb:Facebook) { 

    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if(user){
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      } )
    );
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
