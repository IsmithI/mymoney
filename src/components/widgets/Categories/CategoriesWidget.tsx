import { ELoadState, Load } from "@ismithi/react-utils";
import { CardContent, CircularProgress, Grow } from "@material-ui/core";
import Card, { CardProps } from "@material-ui/core/Card";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { ICategory } from "../../../interfaces/ICategory";
import { IEntityStore } from "../../../stores/entityStore";
import { Route, Switch } from "../../switch";
import { CategoriesList } from "./CategoriesList";
import { Header } from "./Header";

interface Props extends CardProps {
  categoriesStore?: IEntityStore<ICategory>;
}

export const CategoriesWidget = inject("categoriesStore")(
  observer(({ categoriesStore: { entitiesData, load } }: Props) => (
    <Grow in={entitiesData.length > 0}>
      <Card>
        <Header />
        <CardContent>
          <Load instantly on={load}>
            {({ state }) => (
              <Switch value={state}>
                <Route on={ELoadState.SUCCESS}>
                  <CategoriesList categories={entitiesData} />
                </Route>
                <Route on={ELoadState.PENDING}>
                  <CircularProgress />
                </Route>
              </Switch>
            )}
          </Load>
        </CardContent>
      </Card>
    </Grow>
  ))
);
