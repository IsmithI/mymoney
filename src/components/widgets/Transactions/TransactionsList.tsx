import { Grid, List, ListItem, Typography } from "@material-ui/core";
import * as React from "react";
import { ITransaction } from "../../../interfaces";

interface IProps {
  transactions: ITransaction[];
}

export const TransactionsList = ({ transactions }: IProps) => (
  <List disablePadding={true}>
    {transactions.map((t) => (
      <ListItem key={t.id} divider={true}>
        <Grid
          container={true}
          wrap="nowrap"
          justify="space-between"
          alignItems="center"
        >
          <Grid item={true}>
            <Grid container={true} direction="column">
              <Grid item={true}>
                <Typography variant="subtitle1">{t.category}</Typography>
              </Grid>
              <Grid item={true}>
                <Typography variant="subtitle2">{getDate(t.date)}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item={true}>
            <Typography variant="title">{t.amount} &#8372;</Typography>
          </Grid>
        </Grid>
      </ListItem>
    ))}
  </List>
);

function getDate(date: Date) {
  const month =
    date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  const minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  return `${date.getDate()}-${month}-${date.getFullYear()} ${date.getHours()}:${minutes}`;
}
