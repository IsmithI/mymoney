import { computed, action } from "mobx";
import { ITodo } from "../interfaces/ITodo";
import { EntityStore } from "./entityStore";

export interface ITodoStore extends TodoStore {
	todos: ITodo[];
}

class TodoStore extends EntityStore<ITodo> implements ITodoStore {
	constructor() {
		super("todo");
	}

	@computed
	get todos() {
		return [...this.entitiesData].sort((a, b) => {
			return a.created < b.created ? 1 : a.created > b.created ? -1 : 0;
		});
	}

	@computed
	public get entitiesData() {
		return this.entities.map(e => ({
			id: e.id,
			...(e.data() as ITodo),
			created: new Date(e.data().created.seconds * 1000)
		}));
	}

	@action
	toggleTodo = (todo: ITodo) => (completed: boolean) => {
		const data = { ...todo, completed };
		return this.save(data).then(this.load);
	};
}

export const todoStore = new TodoStore();
