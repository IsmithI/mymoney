import { inject, observer } from "mobx-react";
import { IFirebaseStore } from "../stores/firebaseStore";
import { useState } from "react";
import React from "react";
import {
	Typography,
	CircularProgress,
	Grid,
	List,
	ListItem,
	ListItemText
} from "@material-ui/core";
import { ICategoriesStore } from "../stores/categoriesStore";

export interface ICategoriesProps {
	categoriesStore?: ICategoriesStore;
}

@inject("categoriesStore")
@observer
export class Categories extends React.Component<ICategoriesProps> {
	state = {
		loaded: false
	};

	componentDidMount = () => {
		if (this.props.categoriesStore) {
			this.props.categoriesStore.loadCategories().then(() => {
				this.setState({ loaded: true });
			});
		}
	};

	render() {
		const { categoriesStore } = this.props;
		const { loaded } = this.state;

		console.log(categoriesStore && categoriesStore.categoriesData);

		return loaded && categoriesStore ? (
			<Grid container direction="column" spacing={8}>
				<Grid item>
					<Typography variant="h3">Categories</Typography>
				</Grid>
				<Grid item>
					<List>
						{categoriesStore.categoriesData.map(c => (
							<ListItem key={c.id}>
								<ListItemText primary={c.name} />
							</ListItem>
						))}
					</List>
				</Grid>
			</Grid>
		) : (
			<CircularProgress />
		);
	}
}
