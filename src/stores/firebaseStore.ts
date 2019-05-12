import { config } from 'config/firebase';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { action, computed, observable } from 'mobx';

export interface IFirebaseStore {
  userIsLoggedIn: boolean;
  loginWithGoogle: () => void;
  userInfo: any;
}

class FirebaseStore implements IFirebaseStore {
  @observable public user: any;

  public auth: firebase.auth.Auth;
  public authProvider: firebase.auth.GoogleAuthProvider;

  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();

    this.authProvider = new app.auth.GoogleAuthProvider();
    this.auth.onAuthStateChanged(user => {
      this.saveUser(user);
      if (!user) {
        this.loginWithGoogle();
      }
    });
  }

  public loginWithGoogle = () => {
    this.auth.signInWithPopup(this.authProvider);
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
