import { IHasId } from 'interfaces';
import { action, computed, observable } from 'mobx';
import { db } from 'utils';

export interface IEntityStore<T extends IHasId> {
  load: () => Promise<T[]>;
  save: (data: T) => Promise<any>;
  add: (data: T) => Promise<any>;
  get: (id: string) => Promise<T>;
  entities: T[];
  hasEntities: boolean;
}

export class EntityStore<T extends IHasId> implements IEntityStore<T> {
  @computed
  get hasEntities() {
    return this.entities.length > 0;
  }

  @observable entities: T[] = [];

  readonly entity: string;

  constructor(entity: string) {
    this.entity = entity;

    this.load = this.load.bind(this);
    this.add = this.add.bind(this);
  }

  @action
  load() {
    return db.get(this.entity).then(this.saveEntities);
  }

  @action
  save = (data: T) => db.set(this.entity)(data)

  @action
  add(data: T) {
    return db
      .add(this.entity)(data)
      .then(d =>
        d
          .get()
          .then(this.extractData)
          .then(this.addEntity)
      );
  }

  @action
  addEntity = (e: T) => {
    this.entities.push(e);
  }

  @action
  saveEntities = (snapshot: firebase.firestore.QuerySnapshot) => {
    this.entities = snapshot.docs.map(
      d =>
        ({
          id: d.id,
          ...d.data()
        } as T)
    );
    return this.entities;
  }

  @action
  get = (id: string) =>
    db
      .getById(this.entity)(id)
      .then(
        data =>
          ({
            id: data.id,
            ...data.data()
          } as T)
      )

  @action
  delete = (id: string) => {
    const i = this.entities.findIndex(e => e.id === id);
    this.entities.splice(i, 1);
    return db.delete(this.entity)(id);
  }

  extractData = (d: firebase.firestore.QueryDocumentSnapshot) =>
    ({
      id: d.id,
      ...d.data()
    } as T)
}
