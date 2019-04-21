import { Load } from "@ismithi/react-utils";
import {
  Card,
  CardActions,
  CardHeader,
  Collapse,
  Grow,
  Icon,
  IconButton
} from "@material-ui/core";
import { inject, observer } from "mobx-react";
import React from "react";
import { ITransaction } from "../../../interfaces/ITransaction";
import { IEntityStore } from "../../../stores/entityStore";
import { Toggler } from "../../Toggler";
import { AddTransactionDialog } from "./AddTransactionDialog";
import { TransactionsList } from "./TransactionsList";
import { CollapseLoader } from "../../CollapseLoader";

interface Props {
  transactionsStore?: IEntityStore<ITransaction>;
}

@inject("transactionsStore")
@observer
export class TransactionsWidget extends React.Component<Props> {
  state = {
    loading: false,
    dialogIsOpen: false
  };

  handleEntityCreate = (data: ITransaction) => {
    this.setState({ loading: true });
    this.props.transactionsStore
      .add(data)
      .then(this.reset)
      .then(this.props.transactionsStore.load);
  };

  toggle = () => {
    this.setState({ dialogIsOpen: !this.state.dialogIsOpen });
  };

  reset = () => {
    this.setState({
      loading: false,
      dialogIsOpen: false
    });
  };

  render() {
    const { dialogIsOpen, loading } = this.state;
    const {
      transactionsStore: { entitiesData, hasEntities, load }
    } = this.props;

    return (
      <Grow in>
        <Card>
          <CardHeader
            title="Recent transactions"
            titleTypographyProps={{ variant: "title" }}
          />
          <CollapseLoader loading={loading}>
            <Load instantly on={load}>
              {({ loaded }) => (
                <Collapse in={loaded && hasEntities}>
                  <TransactionsList transactions={entitiesData} />
                </Collapse>
              )}
            </Load>
            <CardActions>
              <IconButton onClick={this.toggle}>
                <Icon>add_circle</Icon>
              </IconButton>
            </CardActions>
          </CollapseLoader>
          <AddTransactionDialog
            isOpen={dialogIsOpen}
            onClose={this.toggle}
            onSubmit={this.handleEntityCreate}
          />
        </Card>
      </Grow>
    );
  }
}
