import * as React from "react";
import { inject, observer } from "mobx-react";
import Card, { CardProps } from "@material-ui/core/Card";
import { ICategoriesStore } from "../../../stores/categoriesStore";
import { CardHeader, CardContent, Grid, Icon, Typography, Grow, Avatar, IconButton } from "@material-ui/core";
import { FaIcon } from "../../FaIcon";
import { pink } from "@material-ui/core/colors";

export interface ICategoriesWidgetProps extends CardProps {
	categoriesStore?: ICategoriesStore;
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

			categoriesStore.loadCategories().then(() => this.setState({ loaded: true }));
		}
	}

	render() {
		if (!this.props.categoriesStore) return null;

		const { categoriesData } = this.props.categoriesStore;

		return (
			<Grow in={categoriesData.length > 0}>
				<Card>
          <CardHeader 
            title="Top categories" 
            action={(
              <IconButton>
                <Icon>settings</Icon>
              </IconButton>
            )}
            titleTypographyProps={{ variant: "title" }}
          />
					<CardContent>
						<Grid container>
							{categoriesData.map(c => (
								<Grid item key={c.id}>
									<Avatar>
										<Typography>
											<FaIcon icon={c.icon} />
										</Typography>
									</Avatar>
								</Grid>
							))}
						</Grid>
					</CardContent>
				</Card>
			</Grow>
		);
	}
}
