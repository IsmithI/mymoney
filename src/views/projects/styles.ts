import { createStyles } from '@material-ui/core';

export default () =>
  createStyles({
    fab: {
      position: 'fixed',
      bottom: 24,
      right: 24
    },
    statusTitle: {
      color: '#fff'
    },
    projectCard: {
      cursor: 'pointer'
    }
  });
