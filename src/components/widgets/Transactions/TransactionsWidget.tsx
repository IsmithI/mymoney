import { Load } from "@ismithi/react-utils";
import { Card, CardActions, CardHeader, Grow, Icon, IconButton } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import React from "react";
import { ITransaction } from "../../../interfaces";
import { ITransactionsStore } from "../../../stores/transactionsStore";
import { AddTransactionDialog } from "./AddTransactionDialog";
import { TransactionsList } from "./TransactionsList";

interface ITransactionsWidgetProps {
	transactionsStore: ITransactionsStore;
}

@inject("transactionsStore")
@observer
export class TransactionsWidget extends React.Component {
	public state = {
		showAddDialog: false,
	};

	get injected() {
		return this.props as ITransactionsWidgetProps;
	}

	public toggleAddDialog = (value: boolean = !this.state.showAddDialog) => {
		this.setState({ showAddDialog: value });
	}

	public closeDialog = () => {
		this.toggleAddDialog(false);
	}

	public openDialog = () => {
		this.toggleAddDialog(true);
	}

	public render() {
		const {
			transactionsStore: { entitiesData, hasEntities, load },
		} = this.injected;

		return (
			<Load instantly={true} on={load}>
				{({ loaded }) => (
					<Grow in={loaded && hasEntities}>
						<Card>
							<CardHeader title="Recent transactions" titleTypographyProps={{ variant: "title" }}/>
							<TransactionsList transactions={entitiesData}/>
							<CardActions>
								<IconButton onClick={this.openDialog}>
									<Icon>add_circle</Icon>
								</IconButton>
							</CardActions>
							<AddTransactionDialog
								isOpen={this.state.showAddDialog}
								onCancel={this.closeDialog}
								onSubmit={this.createTransaction}
							/>
						</Card>
					</Grow>
				)}
			</Load>
		);
	}

	public createTransaction = (data: ITransaction) => {
		const { transactionsStore } = this.injected;
		return transactionsStore.add({
			...data,
			date: new Date(),
		}).then(transactionsStore.load).then(() => this.toggleAddDialog(false));
	}
}
