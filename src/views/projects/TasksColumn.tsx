import { useToggler } from '@ismithi/react-utils';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Typography
} from '@material-ui/core';
import { ITask } from 'interfaces';
import * as React from 'react';
import { RouteChildrenProps, withRouter } from 'react-router';
import { extractRawDate } from 'utils/date';

interface IProps extends RouteChildrenProps<any> {
  tasks: ITask[];
  onDelete: (task: ITask) => void;
  onStatusUpgrade: (task: ITask) => void;
}

const Component = ({ tasks, onDelete, onStatusUpgrade }: IProps) => {
  const sortedTasks = tasks.sort((t1, t2) => {
    return new Date(t1.created.seconds * 1000) > new Date(t2.created.seconds * 1000) ? 1 : -1;
  });

  const handleDelete = (task: ITask) => () => onDelete(task);
  const handleNextStatus = (task: ITask) => () => onStatusUpgrade(task);

  return (
    <Grid container direction='column' spacing={16}>
      {sortedTasks.map(task => (
        <Grid item key={task.title}>
          <Card>
            <CardHeader
              title={task.title}
              subheader={extractRawDate(task.created)}
              action={
                <TaskActions onDelete={handleDelete(task)} onNextStatus={handleNextStatus(task)} />
              }
            />
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

export const TasksColumn = withRouter(Component);

interface ITaskActions {
  onDelete: () => void;
  onNextStatus: () => void;
}

const TaskActions = ({ onDelete, onNextStatus }: ITaskActions) => {
  const { isOpen, open, close } = useToggler();
  const [anchor, setAnchor] = React.useState(null);

  const handleClick = (e: React.SyntheticEvent) => {
    open();
    setAnchor(e.currentTarget);
  };

  const handleClose = () => {
    close();
    setAnchor(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <Icon color='primary' innerRef={anchor}>
          more_vert
        </Icon>
      </IconButton>
      <Menu open={isOpen} onClose={handleClose} anchorEl={anchor}>
        {/* <MenuItem>Edit</MenuItem> */}
        <MenuItem onClick={onNextStatus}>Next status</MenuItem>
        <MenuItem onClick={onDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
};
