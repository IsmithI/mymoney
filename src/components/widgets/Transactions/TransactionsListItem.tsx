import { Grid, ListItem, Typography } from '@material-ui/core';
import { ITransaction } from 'interfaces';
import * as React from 'react';
import { extractRawDate } from 'utils/date';

export interface ITransactionsListItem {
  item: ITransaction;
}

export class TransactionsListItem extends React.Component<ITransactionsListItem> {
  public render(): React.ReactNode {
    const { item } = this.props;

    return (
      <ListItem divider={true}>
        <Grid container={true} wrap='nowrap' justify='space-between' alignItems='center'>
          <Grid item={true}>
            <Grid container={true} direction='column'>
              <Grid item={true}>
                <Typography variant='subtitle1'>{item.category}</Typography>
              </Grid>
              <Grid item={true}>
                <Typography variant='subtitle2'>{extractRawDate(item.date)}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item={true}>
            <Typography variant='title'>{item.amount} &#8372;</Typography>
          </Grid>
        </Grid>
      </ListItem>
    );
  }
}
