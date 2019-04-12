

export class FirebaseDB {

	db: firebase.firestore.Firestore;

	constructor(firestore: firebase.firestore.Firestore) {
		this.db = firestore;
	}

	get = (collection: string) => this.db.collection(collection).get();


}