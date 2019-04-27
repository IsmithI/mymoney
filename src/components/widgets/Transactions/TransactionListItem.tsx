import * as React from "react";
import { Grid, Typography } from "@material-ui/core";
import { extractDate } from "../../../utils/date";

interface Props {
  amount: number;
  date: Date;
  category: string;
}

export const TransactionListItem = ({ amount, date, category }: Props) => (
  <Grid
    container
    wrap="nowrap"
    spacing={8}
    justify="space-between"
    alignItems="center"
  >
    <Grid item>
      <Grid container direction="column">
        <Grid item>
          <Typography variant="subtitle1">{category}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2">{extractDate(date, true)}</Typography>
        </Grid>
      </Grid>
    </Grid>
    <Grid item>
      <Typography variant="title">{amount} &#8372;</Typography>
    </Grid>
  </Grid>
);
