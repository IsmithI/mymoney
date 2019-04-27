import * as React from "react";
import { withStyles, Theme, createStyles, WithStyles, Grid } from "@material-ui/core";
import { ReactNode } from "react";

interface Props extends WithStyles<typeof styles> {
	children: ReactNode;
}

const styles = (theme: Theme) =>
	createStyles({
		root: {
			background: theme.palette.background.default,
			padding: "1em",
			minHeight: "100vh",
			overflowX: "hidden",
			boxSizing: "border-box"
		}
	});

export const AppContainer = withStyles(styles)(({ classes, children }: Props) => (
	<div className={classes.root}>
		<Grid container justify='center' spacing={16}>
			<Grid item xs={12} md={10}>
				{children}
			</Grid>
		</Grid>
	</div>
));
