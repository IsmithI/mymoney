import { observer, inject } from "mobx-react";
import React from "react";
import {
	CardContent,
	Card,
	CardHeader,
	Collapse,
	Grid,
	List,
	ListItem,
	ListItemText,
	CardActions,
	IconButton,
	Icon
} from "@material-ui/core";
import { AddTransactionDialog } from "./AddTransactionDialog";
import { IEntityStore } from "../../../stores/entityStore";
import { ITransaction } from "../../../interfaces/ITransaction";

export interface ITransactionsWidgetProps {
	transactionsStore?: IEntityStore<ITransaction>;
}

@inject("transactionsStore")
@observer
export class TransactionsWidget extends React.Component<ITransactionsWidgetProps> {
	state = {
		loaded: false,
		showAddDialog: false
	};

	componentDidMount = () => {
		if (this.props.transactionsStore) {
			this.props.transactionsStore.load().then(() => this.setState({ loaded: true }));
		}
	};

	toggleAddDialog = (value: boolean = !this.state.showAddDialog) => {
		this.setState({ showAddDialog: value });
	};

	render() {
		if (!this.props.transactionsStore) return null;

		const {
			transactionsStore: { entitiesData, hasEntities }
		} = this.props;

		return (
			<Card>
				<CardHeader title="Recent transactions" titleTypographyProps={{ variant: "title" }} />
				<Collapse in={this.state.loaded && hasEntities}>
					<CardContent>
						<List>
							{entitiesData.map(t => (
								<ListItem key={t.id}>
									<ListItemText primary={t.category} secondary={t.date} />
								</ListItem>
							))}
						</List>
					</CardContent>
				</Collapse>
				<CardActions>
					<IconButton onClick={() => this.toggleAddDialog(true)}>
						<Icon>add_circle</Icon>
					</IconButton>
				</CardActions>
				<AddTransactionDialog
					open={this.state.showAddDialog}
					onCancel={() => this.toggleAddDialog(false)}
					onSubmit={() => {}}
				/>
			</Card>
		);
	}
}
