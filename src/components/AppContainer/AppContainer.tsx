import * as React from "react";
import { withStyles, WithStyles } from "@material-ui/core";
import { ReactNode } from "react";
import styles from './styles';

interface Props extends WithStyles<typeof styles> {
	children: ReactNode;
}

export const AppContainer = withStyles(styles)(({ classes, children }: Props) => (
	<div className={classes.root}>
		<div className={classes.container}>{children}</div>
	</div>
));
