import { withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import { ReactNode } from "react";
import styles from "./styles";

interface IProps extends WithStyles<typeof styles> {
	children: ReactNode;
}

export const AppContainer = withStyles(styles)(({ classes, children }: IProps) => (
	<div className={classes.root}>
		<div className={classes.container}>{children}</div>
	</div>
));
