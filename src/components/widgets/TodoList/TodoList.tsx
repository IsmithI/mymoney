import { Load, Toggler } from "@ismithi/react-utils";
import {
	Card,
	CardHeader,
	Checkbox,
	Grid,
	Grow,
	Icon,
	IconButton,
	List,
	ListItem as MuiListItem,
	Typography,
	withStyles
} from "@material-ui/core";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { ITodoStore } from "../../../stores/todoStore";
import { extractDate } from "../../../utils/date";
import { AddTodoItem } from "./AddTodoItem";
import { ITodo } from "../../../interfaces/ITodo";

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

		const handleItemSave = (item: ITodo, close: () => void) => {
			return todoStore.add({ ...item, created: new Date(), completed: !!item.completed }).then(close);
		};
		return (
			<Toggler>
				{({ isOpen, close, open }) => (
					<Load instantly on={todoStore.load}>
						{({ loaded }) => (
							<Grow in={loaded}>
								<Card>
									<CardHeader
										title='Todos'
										titleTypographyProps={{ variant: "title" }}
										action={
											<IconButton onClick={open}>
												<Icon>add_circle</Icon>
											</IconButton>
										}
									/>
									<List disablePadding>
										<AddTodoItem
											isOpen={isOpen}
											onCancel={close}
											onSubmit={(item: ITodo) => handleItemSave(item, close)}
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
								</Card>
							</Grow>
						)}
					</Load>
				)}
			</Toggler>
		);
	})
);
