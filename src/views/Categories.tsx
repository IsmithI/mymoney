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
import { IEntityStore } from "../stores/entityStore";
import { ICategory } from "../interfaces/ICategory";

export interface ICategoriesProps {
	categoriesStore?: IEntityStore<ICategory>;
}

@inject("categoriesStore")
@observer
export class Categories extends React.Component<ICategoriesProps> {
	state = {
		loaded: false
	};

	componentDidMount = () => {
		if (this.props.categoriesStore) {
			this.props.categoriesStore.load().then(() => {
				this.setState({ loaded: true });
			});
		}
	};

	render() {
		const { categoriesStore } = this.props;
		const { loaded } = this.state;

		console.log(categoriesStore && categoriesStore.entitiesData);

		return loaded && categoriesStore ? (
			<Grid container direction="column" spacing={8}>
				<Grid item>
					<Typography variant="h3">Categories</Typography>
				</Grid>
				<Grid item>
					<List>
						{categoriesStore.entitiesData.map(c => (
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
