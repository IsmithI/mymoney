import * as React from "react";
import { TransactionsListItem } from "../../components/widgets/Transactions/TransactionsListItem";
import { ITransaction } from "../../interfaces";
import { IListFactory } from "../../interfaces/IListFactory";
import { ListBuilder } from "../builder/ListBuilder";

class TransactionsListFactory implements IListFactory<ITransaction> {

  public createEntityList = () =>
    new ListBuilder<ITransaction>()
      .itemRenderer(item => <TransactionsListItem key={item.id} item={item}/>)
      .make()
}

export const transactionsListFactory = new TransactionsListFactory();