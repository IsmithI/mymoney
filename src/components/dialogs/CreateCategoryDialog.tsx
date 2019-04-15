import { inject, observer } from "mobx-react";
import React, { useState, ReactNode } from "react";
import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import { DialogTitle, DialogContent } from "@material-ui/core";
import { IEntityStore } from "../../stores/entityStore";
import { ICategory } from "../../interfaces/ICategory";

export interface ICreateCategoryDialog extends Partial<DialogProps> {
	categoriesStore?: IEntityStore<ICategory>;
}

@inject("categoriesStore")
@observer
export class CreateCategoryDialog extends React.Component<ICreateCategoryDialog> {
	render() {
		if (!this.props.categoriesStore) return null;

		return (
			<Toggler>
				{({ isOpen, toggle }) => (
					<Dialog open={isOpen} onClose={() => toggle(false)}>
						<DialogTitle>Create category</DialogTitle>
						<DialogContent>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti, perspiciatis, cum reprehenderit
							accusamus architecto animi magni illum error ab dolorem nisi, alias consectetur! Nemo, dicta aperiam?
							Eveniet odio quis voluptatem.
						</DialogContent>
					</Dialog>
				)}
			</Toggler>
		);
	}
}

interface ITogglerChildProps {
	isOpen: boolean;
	toggle: (val?: boolean) => void;
}

interface ITogglerProps {
	children: (props: ITogglerChildProps) => ReactNode;
}

const Toggler = ({ children }: ITogglerProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = (val: boolean = !isOpen) => setIsOpen(val);

	return (
		<>
			{children({
				isOpen,
				toggle
			})}
		</>
	);
};
