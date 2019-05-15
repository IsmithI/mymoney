import { Card, CardContent, CardHeader, Grid, Typography } from "@material-ui/core";
import { PageHeader } from "components";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { ITransactionsStore } from "stores/transactionsStore";
import { PaymentsChart } from "./PaymentsChart";

interface IProps {
  transactionsStore?: ITransactionsStore;
}

class Component extends React.Component<IProps> {

  componentDidMount(): void {
    this.props.transactionsStore.load();
  }

  render() {
    const { transactionsStore: { chartData, hasEntities, highestExpenses } } = this.props;
    return (
      <>
        <PageHeader title='Payments'/>
        <br/>
        {hasEntities && (
          <Grid container spacing={16}>
            <Grid item>
              <Card>
                <CardHeader title='My expenses by category' />
                <PaymentsChart data={chartData}/>
              </Card>
            </Grid>
            <Grid item>
              <Card>
                <CardHeader
                  title='Highest expenses'
                />
                <CardContent>
                  <Typography variant='subtitle1'>
                    Transaction {highestExpenses.transaction} &#8372;
                  </Typography>
                  <Typography variant='subtitle1'>
                    {highestExpenses.category.title} {highestExpenses.category.amount} &#8372;
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </>
    );
  }
}

export const Payments = inject('transactionsStore')(observer(Component));