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
  Icon,
  Grow
} from "@material-ui/core";
import { AddTransactionDialog } from "./AddTransactionDialog";
import { IEntityStore } from "../../../stores/entityStore";
import { ITransaction } from "../../../interfaces/ITransaction";
import { Load } from "@ismithi/react-utils";
import { Toggler } from "../../Toggler";
import { TransactionsList } from "./TransactionsList";

interface Props {
  transactionsStore?: IEntityStore<ITransaction>;
}

@inject("transactionsStore")
@observer
export class TransactionsWidget extends React.Component<Props> {
  render() {
    const {
      transactionsStore: { entitiesData, hasEntities, load, add }
    } = this.props;

    return (
      <Grow in>
        <Card>
          <CardHeader
            title="Recent transactions"
            titleTypographyProps={{ variant: "title" }}
          />

          <Load instantly on={load}>
            {({ loaded }) => (
              <Collapse in={loaded && hasEntities}>
                <TransactionsList transactions={entitiesData} />
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
                  onSubmit={add}
                />
              </>
            )}
          </Toggler>
        </Card>
      </Grow>
    );
  }
}
