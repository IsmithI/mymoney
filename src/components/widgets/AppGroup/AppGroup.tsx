import { Card, CardContent, Grid, Grow, Icon, IconButton, Typography } from '@material-ui/core';
import * as React from 'react';
import { withRouter } from 'react-router';

const apps = [
  {
    icon: 'library_books',
    title: 'Projects',
    path: 'projects'
  },
  {
    icon: 'settings',
    title: 'Settings',
    path: 'settings'
  }
];

export const AppGroup = withRouter(({ history }) => {
  const nextPage = (page: string) => () => history.push(page);

  return (
    <Grow in={true}>
      <Card>
        <CardContent>
          <Grid container={true} spacing={16}>
            {apps.map(app => (
              <Grid key={app.path} item={true}>
                <Grid container={true} direction='column' wrap='nowrap' alignItems='center'>
                  <Grid item={true}>
                    <IconButton onClick={nextPage(app.path)}>
                      <Icon color='primary' fontSize='large'>
                        {app.icon}
                      </Icon>
                    </IconButton>
                  </Grid>
                  <Grid item={true}>
                    <Typography variant='subtitle1'>{app.title}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Grow>
  );
});
