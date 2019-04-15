import * as React from "react";
import { inject, observer } from "mobx-react";
import Card, { CardProps } from "@material-ui/core/Card";
import { CardHeader, CardContent, Grid, Icon, Typography, Grow, Avatar, IconButton } from "@material-ui/core";
import { FaIcon } from "../../FaIcon";
import { IEntityStore } from "../../../stores/entityStore";
import { ICategory } from "../../../interfaces/ICategory";

export interface ICategoriesWidgetProps extends CardProps {
	categoriesStore?: IEntityStore<ICategory>;
}

@inject("categoriesStore")
@observer
export class CategoriesWidget extends React.Component<ICategoriesWidgetProps> {
	state = {
		loaded: false
	};

	componentDidMount() {
		if (this.props.categoriesStore) {
			const { categoriesStore } = this.props;

			categoriesStore.load().then(() => this.setState({ loaded: true }));
		}
	}

	render() {
		if (!this.props.categoriesStore) return null;

		const { entitiesData } = this.props.categoriesStore;

		return (
			<Grow in={entitiesData.length > 0}>
				<Card>
					<CardHeader
						title="Top categories"
						action={
							<IconButton>
								<Icon>settings</Icon>
							</IconButton>
						}
						titleTypographyProps={{ variant: "title" }}
					/>
					<CardContent>
						<Grid container>
							{entitiesData.map(c => (
								<Grid item key={c.id}>
									<Typography>
										<FaIcon icon={c.icon} />
									</Typography>
								</Grid>
							))}
						</Grid>
					</CardContent>
				</Card>
			</Grow>
		);
	}
}
