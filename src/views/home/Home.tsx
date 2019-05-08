import { Grid } from "@material-ui/core";
import * as React from "react";
import { TransactionsWidget } from "../../components/widgets";
import { TodoList } from "../../components/widgets/TodoList/TodoList";
import { WeatherWidget } from "../../components/widgets/Weather";
import { DigitalClock } from "../../components/widgets/DigitalClock";
import { Toolbar } from "../../components/Toolbar";

export const Home = () => {
	return (
		<>
			<Grid container spacing={16}>
				<Grid item xs={12} sm={8} lg={4}>
					<TodoList />
				</Grid>
				<Grid item xs={12} sm={4}>
					<Grid container spacing={16} justify='center'>
						<Grid item sm={12} lg={6}>
							<WeatherWidget />
						</Grid>
						<Grid item xs lg={6}>
							<DigitalClock />
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} sm={8} lg={4}>
					<TransactionsWidget />
				</Grid>
			</Grid>
			<Toolbar />
		</>
	);
};
