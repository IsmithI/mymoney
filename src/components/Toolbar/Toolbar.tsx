import * as React from "react";
import { withRouter, RouteChildrenProps } from "react-router";
import styles from "./Toolbar.scss";
import { Grid, IconButton, Icon } from "@material-ui/core";

interface Props extends RouteChildrenProps {}

const ToolbarBase = ({  }: Props) => {
	return (
		<nav className={styles.toolbar}>
			<Grid container>
				<Grid item>
					<IconButton>
						<Icon>home</Icon>
					</IconButton>
				</Grid>
			</Grid>
		</nav>
	);
};

export const Toolbar = withRouter(ToolbarBase);
