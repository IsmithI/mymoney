import React from "react";
import { inject, observer } from "mobx-react";
import { Grid } from "@material-ui/core";
import { CategoriesWidget } from "../components/widgets/Categories/CategoriesWidget";
import { TransactionsWidget } from "../components/widgets/Transactions";

@inject("firebaseStore")
@observer
export class Home extends React.Component {
	render() {
		return (
			<Grid container spacing={32}>
				<Grid item>
					<CategoriesWidget />
				</Grid>
				<Grid item>
					<TransactionsWidget />
				</Grid>
			</Grid>
		);
	}
}
