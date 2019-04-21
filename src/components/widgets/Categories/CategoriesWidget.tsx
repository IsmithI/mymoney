import * as React from "react";
import { inject, observer } from "mobx-react";
import Card, { CardProps } from "@material-ui/core/Card";
import {
  CardHeader,
  CardContent,
  Grid,
  Icon,
  Typography,
  Grow,
  IconButton
} from "@material-ui/core";
import { FaIcon } from "../../FaIcon";
import { IEntityStore } from "../../../stores/entityStore";
import { ICategory } from "../../../interfaces/ICategory";
import { Load } from "@ismithi/react-utils";

interface Props {
  categoriesStore: IEntityStore<ICategory>;
}

@inject("categoriesStore")
@observer
export class CategoriesWidget extends React.Component<CardProps> {
  get injected() {
    return this.props as Props;
  }

  render() {
    const { categoriesStore } = this.injected;
    const { entitiesData, load } = categoriesStore;

    return (
      <Grow in={entitiesData.length > 0}>
        <Card>
          <CardHeader
            title="Top categories"
            action={
              <IconButton>
                <Icon>settings</Icon>
              </IconButton>
            }
            titleTypographyProps={{ variant: "title" }}
          />
          <CardContent>
            <Load instantly on={load}>
              {({ loaded }) => (
                <Grid container justify="space-around" spacing={8}>
                  {loaded &&
                    entitiesData.map(c => (
                      <Grid item key={c.id}>
                        <Typography variant="title">
                          <FaIcon icon={c.icon} />
                        </Typography>
                      </Grid>
                    ))}
                </Grid>
              )}
            </Load>
          </CardContent>
        </Card>
      </Grow>
    );
  }
}
