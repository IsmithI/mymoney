import * as React from "react";
import { CircularProgress, Grid } from "@material-ui/core";

export const Login = () => (
	<Grid container justify="center">
		<Grid item>
			<CircularProgress variant="indeterminate" />
		</Grid>
	</Grid>
);
