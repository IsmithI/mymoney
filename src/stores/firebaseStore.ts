import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { config } from '../config/firebase';
import { observable, action, computed } from 'mobx';
import { FirebaseDB } from '../utils/firebaseDB';

export interface IFirebaseStore {
	userIsLoggedIn: boolean;
	loginWithGoogle: () => void;
	userInfo: any;
	db: FirebaseDB;
}

class FirebaseStore implements IFirebaseStore {

	@observable user: any;

	auth: firebase.auth.Auth;
	db: FirebaseDB;
	authProvider: firebase.auth.GoogleAuthProvider;

	constructor() {
		app.initializeApp(config);

		this.auth = app.auth();
		this.db = new FirebaseDB(app.firestore());

		this.authProvider = new app.auth.GoogleAuthProvider();
		this.auth.onAuthStateChanged(user => {
			this.saveUser(user);
			if (!user) this.loginWithGoogle();
		});
	}

	loginWithGoogle = () => {
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
	saveUser = (user: any) => {
		this.user = user;
	}

}

export const firebaseStore = new FirebaseStore();