import { Card, CardHeader, Collapse, Icon, IconButton } from '@material-ui/core';
import { ITransaction } from 'interfaces';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { ITransactionsStore } from 'stores/transactionsStore';
import { AddTransactionDialog } from './AddTransactionDialog';
import { TransactionsList } from './TransactionsList';

interface ITransactionsWidgetProps {
  transactionsStore?: ITransactionsStore;
}

@inject('transactionsStore')
@observer
export class TransactionsWidget extends React.Component<ITransactionsWidgetProps> {
  public state = {
    showAddDialog: false,
    loaded: false
  };

  public toggleAddDialog = (value: boolean = !this.state.showAddDialog) => {
    this.setState({ showAddDialog: value });
  }

  public closeDialog = () => {
    this.toggleAddDialog(false);
  }

  public openDialog = () => {
    this.toggleAddDialog(true);
  }

  componentDidMount = () => {
    this.props.transactionsStore.load().then(() => {
      this.setState({ loaded: true });
    });
  }

  public render() {
    const { loaded } = this.state;
    const {
      transactionsStore: { entities }
    } = this.props;

    return (
      <Card>
        <CardHeader
          title='Recent transactions'
          titleTypographyProps={{ variant: 'title' }}
          action={
            <IconButton onClick={this.openDialog}>
              <Icon>add_circle</Icon>
            </IconButton>
          }
        />
        <Collapse in={loaded}>
          <div>
            <TransactionsList items={entities} />
          </div>
        </Collapse>
        <AddTransactionDialog
          isOpen={this.state.showAddDialog}
          onCancel={this.closeDialog}
          onSubmit={this.createTransaction}
        />
      </Card>
    );
  }

  public createTransaction = (data: ITransaction) => {
    const { transactionsStore } = this.props;
    return transactionsStore
      .add({
        ...data,
        date: new Date()
      })
      .then(transactionsStore.load)
      .then(() => this.toggleAddDialog(false));
  }
}
