import * as React from "react";
import { IHasChildren } from "../../interfaces";
import { Collapse, CircularProgress, Grid } from "@material-ui/core";

interface Props extends IHasChildren {
	loading: boolean;
}

export const CollapseLoader = ({ loading, children }: Props) => (
	<>
		<Collapse in={!loading}>{children}</Collapse>
		{loading && (
			<Grid container justify='center' alignItems='center'>
				<Grid item>
					<CircularProgress />
				</Grid>
			</Grid>
		)}
	</>
);
