import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import { uuid } from 'uuidv4';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {

    if (type !== 'income') {
      if (type !== 'outcome') {
        throw new Error('Invalid transaction type')
      }
    }

    const { total } = this.transactionsRepository.getBalance();
    if (type === 'outcome' && total < value) {
      throw new Error('You do not have enough balance')
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type
    });

    return transaction;

  }
}

export default CreateTransactionService;
