import { createStyles, Grid, Paper, Typography, withStyles } from '@material-ui/core';
import { PaperProps } from '@material-ui/core/Paper';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { getDayOfWeek } from 'utils/date';
import { startsWithZero } from 'utils/number';

const styles = createStyles({
  root: {
    padding: '0.8em',
    minWidth: 150
  }
});

export const DigitalClock = withStyles(styles)(({ ...props }: PaperProps) => {
  const [time, updateTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => updateTime(new Date()), 1000);
    return () => clearInterval(id);
  });

  return (
    <Paper {...props}>
      <Grid container justify='center'>
        <Grid item>
          <Typography variant='h4' style={{ width: '6ch'}}>
            {time.getHours()}:{startsWithZero(time.getMinutes())}:{startsWithZero(time.getSeconds())}
          </Typography>
          <Typography variant='subtitle1'>
            {time.getDate()} {getDayOfWeek(time.getDay())}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
});
