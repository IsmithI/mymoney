import * as React from "react";
import { useState, useEffect } from "react";
import { Typography, createStyles, withStyles, WithStyles, Paper, Grid } from "@material-ui/core";
import { PaperProps } from "@material-ui/core/Paper";
import { startsWithZero } from "../../../utils/number";
import { getDayOfWeek } from "../../../utils/date";

const styles = createStyles({
	content: {
		padding: "0.8em"
	}
});

interface Props extends PaperProps, WithStyles<typeof styles> {
	classes: any;
}

export const DigitalClock = withStyles(styles)(({ classes, ...props }: Props) => {
	const [time, updateTime] = useState(new Date());
	useEffect(() => {
		const id = setInterval(() => updateTime(new Date()), 1000);
		return () => clearInterval(id);
	});

	return (
		<Paper className={classes.content} {...props}>
			<Grid container direction='column' alignItems='center'>
				<Grid item>
					<Typography variant='h4'>
						{time.getHours()}:{startsWithZero(time.getMinutes())}:
						{startsWithZero(time.getSeconds())}
					</Typography>
					<Typography variant='subtitle1'>
						{time.getDate()} {getDayOfWeek(time.getDay())}
					</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
});
