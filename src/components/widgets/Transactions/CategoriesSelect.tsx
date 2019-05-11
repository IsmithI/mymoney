import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import React from "react";
import { ICategory } from "../../../interfaces";
import { IEntityStore } from "../../../stores/entityStore";
import { Load } from "@ismithi/react-utils";

interface Props {
	categoriesStore?: IEntityStore<ICategory>;
	value: any;
	onChange: (id: string) => void;
}

export const CategoriesSelect = inject("categoriesStore")(
	observer(({ categoriesStore, onChange, value }: Props) => {
		return (
			<Load instantly on={categoriesStore.load}>
				{({ loaded }) => (
					<>
						{loaded && (
							<FormControl fullWidth>
								<InputLabel htmlFor="category">Choose category</InputLabel>
								<Select
									style={{ minWidth: 100 }}
									value={value || ""}
									onChange={e => onChange(e.target.value)}
									inputProps={{ name: "name", id: "category" }}
								>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
									{categoriesStore.entitiesData.map(c => (
										<MenuItem key={c.id} value={c.id}>
											{c.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						)}
					</>
				)}
			</Load>
		)
	})
);
