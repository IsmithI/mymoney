import { Checkbox, Grid, Icon, IconButton, ListItem, Typography, withStyles } from '@material-ui/core';
import { IListItem, ITodo } from 'interfaces';
import { observer } from "mobx-react";
import * as React from 'react';
import { extractRawDate } from 'utils/date';

const MuiListItem = withStyles({
  root: {
    padding: '1em 0.3em'
  }
})(ListItem);

@observer
export class TodoListItem extends React.Component<IListItem<ITodo>> {

  public toggleTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onItemChange({ ...this.props.item, completed: e.target.checked });
  }

  public handleDelete = () => {
    this.props.onItemDelete(this.props.item);
  }

  public render(): React.ReactNode {
    const { item } = this.props;
    return (
      <MuiListItem divider={true}>
        <Grid container wrap='nowrap'>
          <Grid item>
            <Checkbox checked={item.completed} onChange={this.toggleTodo}/>
          </Grid>
          <Grid item>
            <Typography variant='subtitle1'>{item.title}</Typography>
            <Typography variant='subtitle2'>{extractRawDate(item.created, true)}</Typography>
          </Grid>
          <Grid item xs={true}>
            <Grid container justify='flex-end'>
              <Grid item>
                <IconButton onClick={this.handleDelete}>
                  <Icon>delete</Icon>
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MuiListItem>
    );
  }
}
