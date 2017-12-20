import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  public user: Observable<firebase.User>;
  constructor(private afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
   }

  register(email, password): Observable<any>{
    return Observable.fromPromise(
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    )
  }  

  loginWithGoogle(){
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  login(email, password): Observable<any>{
    return Observable.fromPromise(
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
    )
  }
  isAuthenticated(): Observable<boolean>{
    return this.user.map(user => user && user.uid !== undefined);
  }
  logout(){
    this.afAuth.auth.signOut();
  }
}
