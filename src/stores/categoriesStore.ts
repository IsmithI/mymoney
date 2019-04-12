import app from "firebase/app";
import "firebase/firestore";
import { FirebaseDB } from "../utils/firebaseDB";
import { observable, action, computed } from "mobx";

export interface ICategoriesStore {
	categoriesData: any[];
	loadCategories: () => Promise<any[]>;

	createDialogIsOpen: boolean;
	toggleCreateDialog: (value: boolean) => void;
}

class CategoriesStore {
	db: FirebaseDB;

	@observable
	categories: any[] = [];

	@observable
	createDialogIsOpen = false;

	constructor() {
		this.db = new FirebaseDB(app.firestore());
	}

	loadCategories = () =>
		this.db.get("categories").then(({ docs }) => {
			this.saveCategories(docs);
			return docs;
		})

	@action
	saveCategories = (categories: any[]) => {
		this.categories = categories;
	};

	@computed
	get categoriesData() {
		return this.categories.map(c => ({
			id: c.id,
			...c.data()
		}));
	}

	@action
	toggleCreateDialog = (value: boolean = !this.createDialogIsOpen) => {
		this.createDialogIsOpen = value;
	}
}

export const categoriesStore = new CategoriesStore();
