import firebase from 'firebase/app';
import 'firebase/firestore';
import { IHasId } from 'interfaces';

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
        ...data
      })

  public add = (collection: string) => (data: T) => this.db.collection(collection).add(data);

  public getById = (collection: string) => (id: string) =>
    this.db
      .collection(collection)
      .doc(id)
      .get()
}

export const db = new FirebaseDB();
