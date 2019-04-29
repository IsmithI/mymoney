import { Load, Toggler } from "@ismithi/react-utils";
import {
	Card,
	CardHeader,
	Checkbox,
	Grid,
	Icon,
	IconButton,
	List,
	ListItem as MuiListItem,
	Typography,
	withStyles,
	Grow
} from "@material-ui/core";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { ITodoStore } from "../../../stores/todoStore";
import { extractDate } from "../../../utils/date";
import { CollapseLoader } from "../../CollapseLoader/CollapseLoader";
import { AddTodoItem } from "./AddTodoItem";

interface Props {
	todoStore?: ITodoStore;
}

const ListItem = withStyles({
	root: {
		padding: "0.3em"
	}
})(MuiListItem);

export const TodoList = inject("todoStore")(
	observer(({ todoStore }: Props) => {
		return (
			<Load instantly on={todoStore.load}>
				{({ loaded }) => (
					<Grow in={loaded}>
						<Card>
							<Toggler>
								{({ isOpen, setIsOpen }) => (
									<>
										<CardHeader
											title='Todos'
											titleTypographyProps={{ variant: "title" }}
											action={
												<IconButton onClick={() => setIsOpen(true)}>
													<Icon>add_circle</Icon>
												</IconButton>
											}
										/>
										<List disablePadding>
											<AddTodoItem
												isOpen={isOpen}
												onCancel={() => setIsOpen(false)}
												onSubmit={todo => todoStore.add(todo).then(() => setIsOpen(false))}
											/>

											{todoStore.todos.map(e => (
												<ListItem key={e.id}>
													<Grid container wrap='nowrap' spacing={8}>
														<Grid item>
															<Checkbox
																checked={e.completed}
																onChange={event => todoStore.toggleTodo(e)(event.target.checked)}
															/>
														</Grid>
														<Grid item>
															<Typography>{e.title}</Typography>
															<Typography>{extractDate(e.created, true)}</Typography>
														</Grid>
													</Grid>
												</ListItem>
											))}
										</List>
									</>
								)}
							</Toggler>
						</Card>
					</Grow>
				)}
			</Load>
		);
	})
);
