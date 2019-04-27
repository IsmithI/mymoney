import { Grid } from "@material-ui/core";
import { GridProps } from "@material-ui/core/Grid";
import { unstable_useMediaQuery as useMediaQuery } from "@material-ui/core/useMediaQuery";
import * as React from "react";
import { CategoriesWidget } from "../components/widgets/Categories/CategoriesWidget";
import { TodoList } from "../components/widgets/TodoList/TodoList";
import { TransactionsWidget } from "../components/widgets/Transactions";
import { WeatherWidget } from "../components/widgets/Weather";

export const Home = () => {
	const isMobile = useMediaQuery("(max-width:720px)");

	const props: GridProps = isMobile
		? {
				direction: "column",
				alignItems: "stretch"
		  }
		: {};

	return (
		<>
			<Grid container {...props} spacing={32}>
				<Grid item sm={8}>
					<TodoList />
				</Grid>
				<Grid item sm={4}>
					<Grid container spacing={16}>
						<Grid item xs>
							<WeatherWidget />
						</Grid>
						<Grid item xs>
							<CategoriesWidget />
						</Grid>
					</Grid>
				</Grid>
				<Grid item sm={4} />
				<Grid item sm={8} lg={4}>
					<TransactionsWidget />
				</Grid>
			</Grid>
		</>
	);
};
