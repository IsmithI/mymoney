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
  Icon,
  Grow
} from "@material-ui/core";
import { AddTransactionDialog } from "./AddTransactionDialog";
import { IEntityStore } from "../../../stores/entityStore";
import { ITransaction } from "../../../interfaces/ITransaction";
import { extractDate } from "../../../utils/date";
import { TransactionListItem } from "./TransactionListItem";
import { Load } from "@ismithi/react-utils";
import { ITransactionsStore } from "../../../stores/transactionsStore";

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
      transactionsStore: { lastTransactions, hasEntities, load }
    } = this.injected;

    return (
      <Grow in>
        <Card>
          <CardHeader
            title="Recent transactions"
            titleTypographyProps={{ variant: "title" }}
          />
          <Load instantly on={load}>
            {({ loaded }) => (
              <Collapse in={loaded && hasEntities}>
                <List disablePadding>
                  {lastTransactions.map(t => (
                    <ListItem key={t.id}>
                      <TransactionListItem
                        {...{ ...t, date: t.date || new Date() }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </Load>

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
    );
  }

  createTransaction = (data: ITransaction) => {
    const { transactionsStore } = this.injected;
    transactionsStore.add(data).then(transactionsStore.load);
  };
}
