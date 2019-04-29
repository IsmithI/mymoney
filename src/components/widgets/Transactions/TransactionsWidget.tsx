import { Load } from "@ismithi/react-utils";
import {
	Card,
	CardActions,
	CardHeader,
	Collapse,
	Grow,
	Icon,
	IconButton,
	List,
	ListItem
} from "@material-ui/core";
import { inject, observer } from "mobx-react";
import React from "react";
import { ITransaction } from "../../../interfaces/ITransaction";
import { ITransactionsStore } from "../../../stores/transactionsStore";
import { TransactionListItem } from "./TransactionListItem";
import { AddTransactionDialog } from "./AddTransactionDialog";

interface ITransactionsWidgetProps {
	transactionsStore: ITransactionsStore;
}

@inject("transactionsStore")
@observer
export class TransactionsWidget extends React.Component {
	state = {
		showAddDialog: false
	};

	get injected() {
		return this.props as ITransactionsWidgetProps;
	}

	toggleAddDialog = (value: boolean = !this.state.showAddDialog) => {
		this.setState({ showAddDialog: value });
	};

	render() {
		const {
			transactionsStore: { entitiesData, hasEntities, load }
		} = this.injected;

		return (
			<Load instantly on={load}>
				{({ loaded }) => (
					<Grow in={loaded}>
						<Card>
							<CardHeader title='Recent transactions' titleTypographyProps={{ variant: "title" }} />

							<Collapse in={loaded && hasEntities}>
								<List disablePadding>
									{entitiesData.map(t => (
										<ListItem key={t.id}>
											<TransactionListItem {...{ ...t, date: t.date || new Date() }} />
										</ListItem>
									))}
								</List>
							</Collapse>

							<CardActions>
								<IconButton onClick={() => this.toggleAddDialog(true)}>
									<Icon>add_circle</Icon>
								</IconButton>
							</CardActions>
							<AddTransactionDialog
								open={this.state.showAddDialog}
								onCancel={() => this.toggleAddDialog(false)}
								onSubmit={this.createTransaction}
							/>
						</Card>
					</Grow>
				)}
			</Load>
		);
	}

	createTransaction = (data: ITransaction) => {
		const { transactionsStore } = this.injected;
		transactionsStore.add(data).then(transactionsStore.load);
	};
}
