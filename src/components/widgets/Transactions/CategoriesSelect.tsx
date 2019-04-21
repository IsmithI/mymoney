import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import React from "react";
import { ICategory } from "../../../interfaces/ICategory";
import { IEntityStore } from "../../../stores/entityStore";

interface Props {
  categoriesStore?: IEntityStore<ICategory>;
  value: any;
  onChange: (e: React.ChangeEvent) => void;
}
export const CategoriesSelect = inject("categoriesStore")(
  observer(({ categoriesStore, onChange, value }: Props) => (
    <FormControl fullWidth>
      <InputLabel htmlFor="category">Choose category</InputLabel>
      <Select
        style={{ minWidth: 100 }}
        value={value}
        onChange={onChange}
        inputProps={{
          name: "name",
          id: "category"
        }}
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
  ))
);
