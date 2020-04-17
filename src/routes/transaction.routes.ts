import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import UpdateTransactionService from '../services/UpdateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();

    return response.status(200).json({ transactions, balance });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    // TODO
    const { title, value, type } = request.body;
    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );

    const transaction = createTransaction.execute({
      title,
      value,
      type,
    });
    return response.status(200).json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.delete('/:idTransaction', (request, response) => {
  try {
    const { idTransaction } = request.params;

    const deleteTransaction = new DeleteTransactionService(
      transactionsRepository,
    );

    deleteTransaction.execute({ id: idTransaction });
    return response.status(200).send();
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.put('/:idTransaction', (request, response) => {
  try {
    const { idTransaction } = request.params;
    const { title, value } = request.body;

    const updateTransaction = new UpdateTransactionService(
      transactionsRepository,
    );
    const transaction = updateTransaction.execute({
      id: idTransaction,
      title,
      value,
    });
    return response.status(200).json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
