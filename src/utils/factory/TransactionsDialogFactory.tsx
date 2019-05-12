import { CategoriesSelect } from 'components/widgets/Transactions';
import { ITransaction } from 'interfaces';
import { IDialogFactory } from 'interfaces/IDialogFactory';
import * as React from 'react';
import { DialogBuilder } from 'utils/builder/DialogBuilder';

class TransactionsDialogFactory implements IDialogFactory<ITransaction> {
  public createAddEntityDialog = () => {
    return new DialogBuilder<ITransaction>()
      .title('Add transaction')
      .withFields()
      .add({
        key: 'comment',
        title: 'Comments',
        type: 'text'
      })
      .add({
        key: 'amount',
        title: 'Spent',
        type: 'number'
      })
      .add({
        key: 'category',
        title: 'Category',
        type: 'entity',
        render: ({ onChange, record }) => (
          <CategoriesSelect onChange={onChange('category')} value={record ? record.category : ''} />
        )
      })
      .get()
      .make();
  }
}

export const transactionsDialogFactory = new TransactionsDialogFactory();
