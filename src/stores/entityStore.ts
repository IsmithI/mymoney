import { action, computed, observable } from "mobx";
import { IHasId } from "../interfaces/IHasId";
import { db } from "../utils/firebaseDB";

export interface IEntityStore<T extends IHasId> {
  load: () => Promise<firebase.firestore.QueryDocumentSnapshot[]>;
  save: (data: T) => Promise<any>;
  add: (data: T) => Promise<any>;
  entitiesData: T[];
  hasEntities: boolean;
}

export class EntityStore<T extends IHasId> implements IEntityStore<T> {

  @computed
  public get entitiesData() {
    return this.entities.map((e) => {
      return {
        id: e.id,
        ...(e.data() as T),
      };
    });
  }

  @computed
  get hasEntities() {
    return this.entities.length > 0;
  }

  @observable
  public entities: firebase.firestore.QueryDocumentSnapshot[] = [];
  private readonly entity: string;

  constructor(entity: string) {
    this.entity = entity;
  }

  @action
  public load = () =>
    this.entities.length > 0
      ? new Promise((r) => r()).then(() => this.entities)
      : db.get(this.entity).then(this.saveEntities)

  @action
  public save = (data: T) => db.set(this.entity)(data)

  @action
  public add = (data: T) =>
    db
      .add(this.entity)(data)
      .then((d) => d.get().then(this.addEntity))

  @action
  public addEntity = (e: firebase.firestore.QueryDocumentSnapshot) => {
    this.entities.push(e);
  }

  @action
  public saveEntities = (snapshot: firebase.firestore.QuerySnapshot) => {
    this.entities = snapshot.docs;
    return this.entities;
  }
}
