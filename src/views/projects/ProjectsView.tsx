import { Grow, Typography } from "@material-ui/core";
import * as React from "react";

export class ProjectView extends React.Component {
  public render() {
    return (
      <Grow in={true}>
        <Typography variant='h2'>My projects</Typography>
      </Grow>
    );
  }
}
