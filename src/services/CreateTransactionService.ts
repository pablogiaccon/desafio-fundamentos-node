import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: CreateTransactionDTO): Transaction {
    // TODO
    if (!title) {
      throw Error('Title must be not null');
    }
    if (typeof title !== 'string') {
      throw Error('Title must be a string');
    }
    if (!value) {
      throw Error('Value must be not null');
    }
    if (typeof value !== 'number') {
      throw Error('Value must be a number');
    }
    if (!type) {
      throw Error('Type must be not null');
    }
    if (!['income', 'outcome'].includes(type)) {
      throw Error('Type must be income or outcome');
    }

    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome' && total < value) {
      throw new Error('You do not have enough balance.');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
