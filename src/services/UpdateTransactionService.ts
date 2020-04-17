import TransactionRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface UpdateTransactionDTO {
  id: string;
  title: string;
  value: number;
}

class UpdateTransactionService {
  private transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  public execute({
    id,
    title,
    value,
  }: UpdateTransactionDTO): Transaction | undefined {
    let transaction = this.transactionRepository.getTransactionById({ id });

    if (!transaction) {
      throw Error('The transaction do not exist');
    }

    transaction = this.transactionRepository.update({ id, title, value });

    return transaction;
  }
}
export default UpdateTransactionService;
