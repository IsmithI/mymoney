import { Grid } from "@material-ui/core";
import * as React from "react";
import { TransactionsWidget } from "../../components/widgets";
import { DigitalClock } from "../../components/widgets/DigitalClock";
import { TodoList } from "../../components/widgets/TodoList/TodoList";
import { WeatherWidget } from "../../components/widgets/Weather";

export const Home = () => {
	return (
		<>
			<Grid container={true} spacing={32}>
				<Grid item={true} xs={12} sm={8} lg={4}>
					<TodoList />
				</Grid>
				<Grid item={true} xs={12} sm={4}>
					<Grid container={true} spacing={32} justify='center'>
						<Grid item={true} sm={12} lg={6}>
							<WeatherWidget />
						</Grid>
						<Grid item={true} xs={8} sm={true} lg={6}>
							<DigitalClock />
						</Grid>
					</Grid>
				</Grid>
				<Grid item={true} xs={12} sm={8} lg={4}>
					<TransactionsWidget />
				</Grid>
			</Grid>
		</>
	);
};
