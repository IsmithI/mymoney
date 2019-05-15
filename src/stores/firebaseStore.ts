import { config } from 'config/firebase';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { action, computed, observable } from 'mobx';

export interface IFirebaseStore {
  userIsLoggedIn: boolean;
  loginWithGoogle: () => void;
  userInfo: any;
  error: app.auth.Error;
}

class FirebaseStore implements IFirebaseStore {
  @observable public user: any;

  @observable public error: app.auth.Error;

  public auth: firebase.auth.Auth;
  public authProvider: firebase.auth.GoogleAuthProvider;

  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();

    this.authProvider = new app.auth.GoogleAuthProvider();
    this.auth.onAuthStateChanged(user => {
      this.saveUser(user);
      if (!user) {
        return this.loginWithGoogle();
      }
    }, this.saveError);
  }

  public loginWithGoogle = () => {
    return this.auth.signInWithPopup(this.authProvider);
  }

  @action
  public saveError = (err: app.auth.Error) => {
    this.error = err;
    return err;
  }

  @computed
  get userInfo() {
    return this.user;
  }

  @computed
  get userIsLoggedIn() {
    return !!this.user;
  }

  @action
  public saveUser = (user: any) => {
    this.user = user;
  }
}

export const firebaseStore = new FirebaseStore();
