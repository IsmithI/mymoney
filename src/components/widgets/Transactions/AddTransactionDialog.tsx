import {
	Dialog,
	DialogTitle,
	DialogContent,
	Grid,
	TextField,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	DialogActions,
	Button
} from "@material-ui/core";
import React, { useState } from "react";
import { ITransaction } from "../../../interfaces/ITransaction";
import { CategoriesSelect } from "./CategoriesSelect";
import { inject, observer } from "mobx-react";
import { IEntityStore } from "../../../stores/entityStore";
import { Load } from "@ismithi/react-utils";
import { ICategory } from "../../../interfaces";

const emptyTransaction: ITransaction = {
	id: "",
	amount: 0,
	category: "",
	date: new Date()
};

export interface IAddTransactionDialogProps {
	open: boolean;
	onSubmit: (data: ITransaction) => void;
	onCancel: () => void;
}

export const AddTransactionDialog = ({ open, onCancel, onSubmit }: IAddTransactionDialogProps) => {
	const [data, setData] = useState<ITransaction>(emptyTransaction);
	const updateField = (field: string) => (e: React.ChangeEvent<any>) => {
		setData({ ...data, [field]: e.target.value });
	};

	return (
		<Dialog open={open} onClose={onCancel}>
			<DialogTitle>Add transaction</DialogTitle>
			<DialogContent>
				<Grid container direction='column' alignItems='stretch' spacing={16}>
					<Grid item>
						<TextField
							fullWidth
							label='comment'
							value={data.comment || ""}
							onChange={updateField("comment")}
						/>
					</Grid>
					<Grid item>
						<CategoriesList value={data.category} onChange={updateField("category")} />
					</Grid>
					<Grid item>
						<TextField
							fullWidth
							label='amount'
							type='number'
							value={data.amount}
							onChange={updateField("amount")}
						/>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button color='primary' variant='contained' onClick={() => onSubmit(data)}>
					Add
				</Button>
			</DialogActions>
		</Dialog>
	);
};

interface ICategoriesList {
	categoriesStore?: IEntityStore<ICategory>;
	value: any;
	onChange: (e: React.ChangeEvent) => void;
}

const CategoriesList = inject("categoriesStore")(
	observer(({ categoriesStore, onChange, value }: ICategoriesList) => (
		<FormControl fullWidth>
			<InputLabel htmlFor='category'>Choose category</InputLabel>
			<Select
				style={{ minWidth: 100 }}
				value={value}
				onChange={onChange}
				inputProps={{
					name: "name",
					id: "category"
				}}
			>
				<MenuItem value=''>
					<em>None</em>
				</MenuItem>
				{categoriesStore &&
					categoriesStore.entitiesData.map(c => (
						<MenuItem key={c.id} value={c.id}>
							{c.name}
						</MenuItem>
					))}
			</Select>
		</FormControl>
	))
);
