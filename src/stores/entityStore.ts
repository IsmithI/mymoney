import { IHasId } from "../interfaces/IHasId";
import { db } from "../utils/firebaseDB";
import { action, observable, computed } from "mobx";

export interface IEntityStore<T extends IHasId> {
	load: () => Promise<firebase.firestore.QuerySnapshot>;
	save: (data: T) => Promise<any>;
	add: (data: T) => Promise<any>;
	entitiesData: T[];
	hasEntities: boolean;
}

export class EntityStore<T extends IHasId> implements IEntityStore<T> {
	private entity: string;

	@observable
	public entities: firebase.firestore.QueryDocumentSnapshot[] = [];

	constructor(entity: string) {
		this.entity = entity;
	}

	@action
	load = () => db.get(this.entity).then(this.saveEntities);

	@action
	save = (data: T) => db.set(this.entity)(data);

	@action
	add = (data: T) =>
		db
			.add(this.entity)(data)
			.then(d => d.get().then(this.addEntity));

	@action
	addEntity = (e: firebase.firestore.QueryDocumentSnapshot) => {
		this.entities.push(e);
	};

	@action
	saveEntities = (snapshot: firebase.firestore.QuerySnapshot) => {
		this.entities = snapshot.docs;
		return snapshot;
	};

	@computed
	public get entitiesData() {
		return this.entities.map(e => {
			return {
				id: e.id,
				...(e.data() as T)
			};
		});
	}

	@computed
	get hasEntities() {
		return this.entities.length > 0;
	}
}
