import { Card, CardContent, Grid, Icon, IconButton, Typography } from '@material-ui/core';
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
    <Card>
      <CardContent>
        <Grid container spacing={16}>
          {apps.map(app => (
            <Grid key={app.path} item>
              <Grid container direction='column' wrap='nowrap' alignItems='center'>
                <Grid item>
                  <IconButton onClick={nextPage(app.path)}>
                    <Icon color='primary' fontSize='large'>
                      {app.icon}
                    </Icon>
                  </IconButton>
                </Grid>
                <Grid item>
                  <Typography variant='subtitle1'>{app.title}</Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
});
