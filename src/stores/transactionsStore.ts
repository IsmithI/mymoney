import { ITransaction } from 'interfaces';
import { computed } from 'mobx';
import { EntityStore } from './entityStore';

export interface ITransactionsStore extends TransactionsStore {
  lastTransactions: ITransaction[];
  chartData: any[];
  highestExpenses: {
    transaction: number,
    category: {
      title: string,
      amount: number
    }
  };
}

class TransactionsStore extends EntityStore<ITransaction> {
  constructor() {
    super('transactions');
  }

  @computed
  get lastTransactions() {
    return [...this.entities]
      .sort((a, b) => (a.date && b.date ? (a.date > b.date ? 1 : 0) : 0))
      .slice(0, 4);
  }

  @computed
  get categories() {
    return this.entities.reduce((categories, transaction) => {
      const category = categories.find(c => c === transaction.category);
      return category ? [...categories, category] : categories;
    }, []);
  }

  @computed
  get groupedByCategory() {
    return this.entities.reduce((group, t) => {
      (group[t.category] = group[t.category] || []).push(t);
      return group;
    }, {});
  }

  @computed
  get chartData() {
    return [
      ['Category', 'Amount'],
      ...Object.entries<ITransaction[]>(this.groupedByCategory).map(([key, values]) => {
        return [
          key,
          values.reduce((sum, t) => {
            return sum + (parseInt(t.amount.toString(), 10));
          }, 0)
        ];
      })
    ];
  }

  @computed
  get highestExpenses() {
    const categoryAmount = Object.entries<any>(this.groupedByCategory).reduce((c, [category, transactions]) => {
      const amount = transactions.reduce((sum, t) => {
        return sum + parseInt(t.amount, 10);
      }, 0);
      return amount > c.amount ? {
        title: category,
        amount
      } : c;
    }, {
      title: '',
      amount: 0
    });

    return {
      transaction: this.entities.reduce((expense, t) => {
        return Math.max(expense, parseInt(t.amount.toString(), 10));
      }, 0),
      category: categoryAmount
    };
  }
}

export const transactionsStore = new TransactionsStore();
