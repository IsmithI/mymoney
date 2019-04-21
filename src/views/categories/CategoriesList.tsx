import { ELoadState, Load } from "@ismithi/react-utils";
import {
  CircularProgress,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import React from "react";
import { Route, Switch } from "../../components/switch";
import { ICategory } from "../../interfaces";

interface Props {
  load: () => Promise<any>;
  categories: ICategory[];
}

export const CategoriesList = ({ load, categories }: Props) => (
  <Load instantly on={load}>
    {({ state }) => (
      <Switch value={state}>
        <Route on={ELoadState.SUCCESS}>
          <List>
            {categories.map(c => (
              <ListItem key={c.id}>
                <ListItemText primary={c.name} />
              </ListItem>
            ))}
          </List>
        </Route>
        <Route on={ELoadState.PENDING}>
          <CircularProgress />
        </Route>
      </Switch>
    )}
  </Load>
);
