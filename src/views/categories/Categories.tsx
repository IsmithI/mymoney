import { Grid, Typography } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import React from "react";
import { ICategory } from "../../interfaces/ICategory";
import { IEntityStore } from "../../stores/entityStore";
import { CategoriesList } from "./CategoriesList";

interface Props {
  categoriesStore?: IEntityStore<ICategory>;
}

export const Categories = inject("categoriesStore")(
  observer(({ categoriesStore: { load, entitiesData } }: Props) => (
    <Grid container direction="column" spacing={8}>
      <Grid item>
        <Typography variant="h3">Categories</Typography>
      </Grid>
      <Grid item>
        <CategoriesList load={load} categories={entitiesData} />
      </Grid>
    </Grid>
  ))
);
