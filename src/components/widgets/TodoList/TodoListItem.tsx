import { Checkbox, Grid, ListItem, Typography, withStyles } from '@material-ui/core';
import { ITodo } from 'interfaces';
import * as React from 'react';
import { extractRawDate } from 'utils/date';

const MuiListItem = withStyles({
  root: {
    padding: '1em 0.3em'
  }
})(ListItem);

interface ITodoListItem {
  record: ITodo;
}

export class TodoListItem extends React.Component<ITodoListItem> {
  public render(): React.ReactNode {
    const { record } = this.props;

    return (
      <MuiListItem divider={true}>
        <Grid container={true} wrap='nowrap'>
          <Grid item={true}>
            <Checkbox checked={record.completed} />
          </Grid>
          <Grid item={true}>
            <Typography variant='subtitle1'>{record.title}</Typography>
            <Typography variant='subtitle2'>{extractRawDate(record.created, true)}</Typography>
          </Grid>
        </Grid>
      </MuiListItem>
    );
  }
}
