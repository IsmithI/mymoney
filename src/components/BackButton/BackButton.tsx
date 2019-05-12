import { Icon, IconButton } from '@material-ui/core';
import * as React from 'react';
import { withRouter } from 'react-router';

export const BackButton = withRouter(({ history }) => {
  const goBack = () => history.goBack();
  return (
    <IconButton onClick={goBack}>
      <Icon color='inherit' fontSize='large'>
        arrow_back
      </Icon>
    </IconButton>
  );
});
