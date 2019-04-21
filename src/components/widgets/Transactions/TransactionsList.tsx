import { Grid, List, ListItem, Typography } from "@material-ui/core";
import * as React from "react";
import { ITransaction } from "../../../interfaces";

interface Props {
  transactions: ITransaction[];
}

export const TransactionsList = ({ transactions }: Props) => (
  <List disablePadding>
    {transactions.map(t => (
      <ListItem key={t.id} divider>
        <Grid
          container
          wrap="nowrap"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="subtitle1">{t.category}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle2">{getDate(t.date)}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
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
