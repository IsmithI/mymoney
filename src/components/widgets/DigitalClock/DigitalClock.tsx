import { createStyles, Paper, Typography, withStyles, WithStyles } from '@material-ui/core';
import { PaperProps } from '@material-ui/core/Paper';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { getDayOfWeek } from 'utils/date';
import { startsWithZero } from 'utils/number';

const styles = createStyles({
  content: {
    padding: '0.8em'
  }
});

interface IProps extends PaperProps, WithStyles<typeof styles> {
  classes: any;
}

export const DigitalClock = withStyles(styles)(({ classes, ...props }: IProps) => {
  const [time, updateTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => updateTime(new Date()), 1000);
    return () => clearInterval(id);
  });

  return (
    <Paper className={classes.content} {...props}>
      <Typography variant='h4'>
        {time.getHours()}:{startsWithZero(time.getMinutes())}:{startsWithZero(time.getSeconds())}
      </Typography>
      <Typography variant='subtitle1'>
        {time.getDate()} {getDayOfWeek(time.getDay())}
      </Typography>
    </Paper>
  );
});
