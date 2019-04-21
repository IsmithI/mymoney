import * as React from "react";
import {
  Collapse,
  List,
  ListItem,
  ListItemText,
  Grid,
  Typography,
  Divider
} from "@material-ui/core";
import { ITransaction } from "../../../interfaces";

interface Props {
  transactions: ITransaction[];
}

export const TransactionsList = ({ transactions }: Props) => (
  <List disablePadding>
    {transactions.map(t => (
      <>
        <ListItem key={t.id}>
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
        <Divider variant="fullWidth" />
      </>
    ))}
  </List>
);

function getDate(date: Date) {
  return `${date.getDate()}-${date.getMonth() +
    1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
}
