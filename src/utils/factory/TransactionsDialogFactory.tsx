import { IDialogFactory } from "../../interfaces/IDialogFactory";
import { ITransaction } from "../../interfaces";
import { DialogBuilder } from "../builder/DialogBuilder";
import { CategoriesSelect } from "../../components/widgets/Transactions/CategoriesSelect";
import React from "react";

class TransactionsDialogFactory implements IDialogFactory<ITransaction> {

	createAddEntityDialog = () => {
		return new DialogBuilder()
			.title('Add transaction')
			.withFields()
			.add({
				key: 'comment',
				title: 'Comments',
				type: 'text'
			})
			.add({
				key: 'amount',
				title: 'Spent',
				type: 'number'
			})
			.add({
				key: 'category',
				title: 'Category',
				type: 'entity',
				render: ({ onChange, record }) =>
					<CategoriesSelect
						onChange={onChange('category')}
						value={record ? record.category : ""}
					/>
			})
			.get()
			.make();
	}
}

export const transactionsDialogFactory = new TransactionsDialogFactory();