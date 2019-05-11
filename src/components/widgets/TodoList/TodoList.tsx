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
	withStyles,
} from "@material-ui/core";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { ITodo } from "../../../interfaces/ITodo";
import { ITodoStore } from "../../../stores/todoStore";
import { extractDate } from "../../../utils/date";
import { AddTodoItem } from "./AddTodoItem";

interface IProps {
	todoStore?: ITodoStore;
}

const ListItem = withStyles({
	root: {
		padding: "0.3em",
	},
})(MuiListItem);

export const TodoList = inject("todoStore")(
	observer(({ todoStore }: IProps) => {

		const handleItemSave = (close: () => void) => (item: ITodo) => {
			return todoStore.add({ ...item, created: new Date(), completed: !!item.completed }).then(close);
		};
		const handleTodoToggle = (item: ITodo) => (e: React.ChangeEvent<HTMLInputElement>) => {
			return todoStore.toggleTodo(item)(e.target.checked);
		};

		return (
			<Toggler>
				{({ isOpen, close, open }) => (
					<Load instantly={true} on={todoStore.load}>
						{({ loaded }) => (
							<Grow in={loaded}>
								<Card>
									<CardHeader
										title="Todos"
										titleTypographyProps={{ variant: "title" }}
										action={
											<IconButton onClick={open}>
												<Icon>add_circle</Icon>
											</IconButton>
										}
									/>
									<List disablePadding={true}>
										<AddTodoItem
											isOpen={isOpen}
											onCancel={close}
											onSubmit={handleItemSave(close)}
										/>
										{todoStore.todos.map((e) => (
											<ListItem key={e.id}>
												<Grid container={true} wrap="nowrap" spacing={8}>
													<Grid item={true}>
														<Checkbox
															checked={e.completed}
															onChange={handleTodoToggle(e)}
														/>
													</Grid>
													<Grid item={true}>
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
	}),
);
