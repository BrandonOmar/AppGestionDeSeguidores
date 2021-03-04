import { Injectable } from '@angular/core';
import { User } from '../shared/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import {AngularFirestore, AngularFirestoreDocument,AngularFirestoreCollection} from '@angular/fire/firestore'
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';



import {DatosI} from '../models/datosSeguidor.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private datosCollection : AngularFirestoreCollection<DatosI>;

  public user$: Observable<User>;


  constructor( private afAuth: AngularFireAuth, private afs: AngularFirestore)
  { 

    this.datosCollection = afs.collection<DatosI>('DatosSeguidores');


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

  async loginTwitter():Promise<User>{
    try {
      const { user } = await this.afAuth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
      this.updateUserData(user);
      return user;
    }
    catch (error){
      console.log('Error -> ',error)
    }
  }


  async loginFacebook():Promise<User>{
    try {
      const { user } = await this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
      this.updateUserData(user);
      return user;
    }
    catch (error){
      console.log('Error -> ',error);
    }
  }


  async loginGithub():Promise<User>{
    
    try {
      const { user } = await this.afAuth.signInWithPopup(new firebase.auth.GithubAuthProvider());
      this.updateUserData(user);
      return user;
    }
    catch (error){
      console.log('Error -> ',error);
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
  
  
  public consultar(coleccion) {
    return this.afs.collection(coleccion).snapshotChanges();
  }

}
