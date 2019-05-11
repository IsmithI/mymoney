import React from "react";
import { CategoriesSelect } from "../../components/widgets/Transactions/CategoriesSelect";
import { ITransaction } from "../../interfaces";
import { IDialogFactory } from "../../interfaces/IDialogFactory";
import { DialogBuilder } from "../builder/DialogBuilder";

class TransactionsDialogFactory implements IDialogFactory<ITransaction> {

	public createAddEntityDialog = () => {
		return new DialogBuilder()
			.title("Add transaction")
			.withFields()
			.add({
				key: "comment",
				title: "Comments",
				type: "text",
			})
			.add({
				key: "amount",
				title: "Spent",
				type: "number",
			})
			.add({
				key: "category",
				title: "Category",
				type: "entity",
				render: ({ onChange, record }) => (
					<CategoriesSelect
						onChange={onChange("category")}
						value={record ? record.category : ""}
					/>
				),
			})
			.get()
			.make();
	}
}

export const transactionsDialogFactory = new TransactionsDialogFactory();
