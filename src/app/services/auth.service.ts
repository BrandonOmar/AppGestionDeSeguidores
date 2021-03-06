import { Injectable } from '@angular/core';
import { User } from '../shared/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import {AngularFirestore, AngularFirestoreDocument,AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable, of ,BehaviorSubject} from 'rxjs';
import { switchMap } from 'rxjs/operators';



import {DatosI} from '../models/datosSeguidor.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private datosCollection : AngularFirestoreCollection<DatosI>;

  public user$: Observable<User>;

  /**Variables para enviar datos de administrador a detalleSeguidor */
  private objectSource = new BehaviorSubject<{}>({});
  $getObjectSource = this.objectSource.asObservable();

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

  guardarDatosSeguidores(newDatosSeguidor : DatosI, estrellas : string): void
  {
    newDatosSeguidor.calificacion = estrellas;
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
  
  
  // Administrador: Consulta y eliminación de seguidores

  public consultarSeguidores(coleccion) {
    return this.afs.collection(coleccion).snapshotChanges();
  }

  public seguidores() {
    return this.afs.collection<DatosI[]>("DatosSeguidores").snapshotChanges();
  }

  
   public eliminarSeguidor(id:any) {
  
  return this.afs.collection("DatosSeguidores").doc(id).delete();
  }

  public consultarSeguidorPorId(id:any) {
    return this.afs.collection("DatosSeguidores").doc(id).snapshotChanges();
  }


/** Método para enviar datos de administrador a detalleSeguidor */

  sendObjectSource(data:any)
  {
    this.objectSource.next(data);
  }

  /** Método para obtener los países */
  public consultarPaises(coleccion) {
    return this.afs.collection(coleccion).snapshotChanges();
  }

}
