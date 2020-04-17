import TransactionRepository from '../repositories/TransactionsRepository';

interface Request {
  id: string;
}

class DeleteTransactionService {
  private transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  public execute({ id }: Request): void {
    const transaction = this.transactionRepository.getTransactionById({ id });

    if (!transaction) {
      throw Error('Transaction do not exist');
    }

    this.transactionRepository.delete({ id });
  }
}

export default DeleteTransactionService;
