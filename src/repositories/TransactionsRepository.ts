import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  id: string;
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    // TODO

    return this.transactions;
  }

  public update({
    id,
    title,
    value,
  }: Omit<TransactionDTO, 'type'>): Transaction {
    const transactionIndex = this.transactions.findIndex(
      item => item.id === id,
    );

    const transactionUpdated = {
      id,
      title,
      value,
      type: this.transactions[transactionIndex].type,
    };

    this.transactions[transactionIndex] = transactionUpdated;

    return transactionUpdated;
  }

  public delete({
    id,
  }: Omit<TransactionDTO, 'title' | 'value' | 'type'>): void {
    const transactionIndex = this.transactions.findIndex(
      item => item.id === id,
    );
    const transactionDeleted = this.transactions.splice(transactionIndex, 1);
  }

  public getTransactionById({
    id,
  }: Omit<TransactionDTO, 'title' | 'value' | 'type'>):
    | Transaction
    | undefined {
    const transaction = this.transactions.find(item => item.id === id);

    return transaction;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (accumulator: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            accumulator.income += transaction.value;
            break;
          case 'outcome':
            accumulator.outcome += transaction.value;
            break;
          default:
            break;
        }
        accumulator.total = accumulator.income - accumulator.outcome;
        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    return balance;
  }

  public create({
    title,
    value,
    type,
  }: Omit<TransactionDTO, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
