import { Checkbox, Grid, ListItem, Typography, withStyles } from "@material-ui/core";
import * as React from "react";
import { ITodo } from "../../../interfaces/ITodo";
import { extractDate } from "../../../utils/date";

const MuiListItem = withStyles({
  root: {
    padding: "1em 0.3em",
  },
})(ListItem);

interface ITodoListItem {
  record: ITodo;
}

export class TodoListItem extends React.Component<ITodoListItem> {

  public render(): React.ReactNode {
    const { record } = this.props;

    return (
      <MuiListItem divider={true}>
        <Grid container={true} wrap="nowrap">
          <Grid item={true}>
            <Checkbox
              checked={record.completed}
            />
          </Grid>
          <Grid item={true}>
            <Typography variant="subtitle1">{record.title}</Typography>
            <Typography variant="subtitle2">{extractDate(record.created, true)}</Typography>
          </Grid>
        </Grid>
      </MuiListItem>
    );
  }
}