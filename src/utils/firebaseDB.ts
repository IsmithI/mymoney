import firebase from "firebase/app";
import "firebase/firestore";
import { IHasId } from "./../interfaces/IHasId";

export class FirebaseDB<T extends IHasId> {
	public db: firebase.firestore.Firestore;

	constructor() {
		this.db = firebase.app().firestore();
	}

	public get = (collection: string) => this.db.collection(collection).get();

	public set = (collection: string) => (data: T) =>
		this.db
			.collection(collection)
			.doc(data.id)
			.set({
				...data,
			})

	public add = (collection: string) => (data: T) => this.db.collection(collection).add(data);
}

export const db = new FirebaseDB();
