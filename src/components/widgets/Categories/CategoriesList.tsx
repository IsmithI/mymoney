import { Grid, Typography } from "@material-ui/core";
import { FaIcon } from "../../FaIcon";
import { ICategory } from "../../../interfaces/ICategory";
import React from "react";

interface CategoriesListProps {
  categories: ICategory[];
}

export const CategoriesList = ({ categories }: CategoriesListProps) => (
  <Grid container spacing={8} justify="space-around">
    {categories.map(c => (
      <Grid item key={c.id}>
        <Typography variant="title">
          <FaIcon icon={c.icon} />
        </Typography>
      </Grid>
    ))}
  </Grid>
);
