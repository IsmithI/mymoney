import { IHasId } from "./../interfaces/IHasId";
import firebase from "firebase/app";
import "firebase/firestore";

export class FirebaseDB<T extends IHasId> {
	db: firebase.firestore.Firestore;

	constructor() {
		this.db = firebase.app().firestore();
	}

	get = (collection: string) => this.db.collection(collection).get();

	set = (collection: string) => (data: T) =>
		this.db
			.collection(collection)
			.doc(data.id)
			.set({
				...data
			});

	add = (collection: string) => (data: T) => this.db.collection(collection).add(data);
}

export const db = new FirebaseDB();
