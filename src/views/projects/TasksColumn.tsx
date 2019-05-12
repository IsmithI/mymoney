import { Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import { ITask } from 'interfaces';
import * as React from 'react';
import { extractRawDate } from 'utils/date';

interface IProps {
  tasks: ITask[];
}

export const TasksColumn = ({ tasks }: IProps) => {
  return (
    <Grid container={true} direction='column' spacing={16}>
      {tasks.map(task => (
        <Grid item={true} key={task.title}>
          <Card>
            <CardHeader title={task.title} subheader={extractRawDate(task.created)} />
            {task.comments && (
              <CardContent>
                <Typography>{task.comments}</Typography>
              </CardContent>
            )}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
