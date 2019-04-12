import { inject, observer } from "mobx-react";
import React from "react";
import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import { ICategoriesStore } from "../../stores/categoriesStore";
import { DialogTitle, DialogContent } from "@material-ui/core";

export interface ICreateCategoryDialog extends Partial<DialogProps> {
	categoriesStore?: ICategoriesStore;
}

@inject("categoriesStore")
@observer
export class CreateCategoryDialog extends React.Component<ICreateCategoryDialog> {
	render() {
		if (!this.props.categoriesStore) return null;

		const { toggleCreateDialog, createDialogIsOpen } = this.props.categoriesStore;

		return (
			<Dialog open={createDialogIsOpen} onClose={() => toggleCreateDialog(false)}>
				<DialogTitle>Create category</DialogTitle>
				<DialogContent>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti, perspiciatis, cum reprehenderit accusamus
					architecto animi magni illum error ab dolorem nisi, alias consectetur! Nemo, dicta aperiam? Eveniet odio quis
					voluptatem.
				</DialogContent>
			</Dialog>
		);
	}
}
