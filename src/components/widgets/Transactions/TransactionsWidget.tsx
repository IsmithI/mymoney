import { observer, inject } from "mobx-react";
import React from "react";
import {
  CardContent,
  Card,
  CardHeader,
  Collapse,
  Grid,
  List,
  ListItem,
  ListItemText,
  CardActions,
  IconButton,
  Icon
} from "@material-ui/core";
import { AddTransactionDialog } from "./AddTransactionDialog";
import { IEntityStore } from "../../../stores/entityStore";
import { ITransaction } from "../../../interfaces/ITransaction";
import { Load } from "@ismithi/react-utils";
import { Toggler } from "../../Toggler";

interface Props {
  transactionsStore?: IEntityStore<ITransaction>;
}

@inject("transactionsStore")
@observer
export class TransactionsWidget extends React.Component<Props> {
  state = {
    showAddDialog: false
  };

  toggleAddDialog = (value: boolean = !this.state.showAddDialog) => {
    this.setState({ showAddDialog: value });
  };

  render() {
    const {
      transactionsStore: { entitiesData, hasEntities, load }
    } = this.props;

    return (
      <Card>
        <CardHeader
          title="Recent transactions"
          titleTypographyProps={{ variant: "title" }}
        />

        <Load instantly on={load}>
          {({ loaded }) => (
            <Collapse in={loaded && hasEntities}>
              <CardContent>
                <List>
                  {entitiesData.map(t => (
                    <ListItem key={t.id}>
                      <ListItemText
                        primary={t.category}
                        secondary={getDate(t.date)}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Collapse>
          )}
        </Load>

        <Toggler>
          {({ isOpen, toggle }) => (
            <>
              <CardActions>
                <IconButton onClick={toggle}>
                  <Icon>add_circle</Icon>
                </IconButton>
              </CardActions>
              <AddTransactionDialog
                isOpen={isOpen}
                onClose={toggle}
                onSubmit={() => {}}
              />
            </>
          )}
        </Toggler>
      </Card>
    );
  }
}

function getDate(date: Date) {
  return `${date.getDate()}-${date.getMonth() +
    1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
}
