import { Grid } from "@material-ui/core";
import { GridProps } from "@material-ui/core/Grid";
import { unstable_useMediaQuery as useMediaQuery } from "@material-ui/core/useMediaQuery";
import * as React from "react";
import { CategoriesWidget } from "../components/widgets/Categories/CategoriesWidget";
import { TodoList } from "../components/widgets/TodoList/TodoList";
import { TransactionsWidget } from "../components/widgets/Transactions";
import { WeatherWidget } from "../components/widgets/Weather";
import { DigitalClock } from "../components/widgets/DigitalClock";

export const Home = () => {
	const isMobile = useMediaQuery("(max-width:600px)");

	const props: GridProps = isMobile
		? {
				direction: "column",
				alignItems: "stretch"
		  }
		: {};

	return (
		<>
			<Grid container spacing={32}>
				<Grid item xs={12} sm={8} lg={4}>
					<TodoList />
				</Grid>
				<Grid item xs={12} sm={4}>
					<Grid container spacing={16} justify='center'>
						<Grid item xs>
							<WeatherWidget />
						</Grid>
						<Grid item>
							<DigitalClock />
						</Grid>
						<Grid item xs>
							<CategoriesWidget />
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} sm={8} lg={4}>
					<TransactionsWidget />
				</Grid>
			</Grid>
		</>
	);
};
