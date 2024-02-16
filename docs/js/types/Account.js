import { TransactionType } from './TransactionType.js';
export class Account {
    name;
    balance = JSON.parse(localStorage.getItem('balance')) || 0;
    transactions = JSON.parse(localStorage.getItem('transactions'), (key, value) => {
        if (key === 'date') {
            return new Date(value);
        }
        return value;
    }) || [];
    constructor(name) {
        this.name = name;
    }
    getBalance() {
        return this.balance;
    }
    getAccessDate() {
        return new Date();
    }
    debit(value) {
        if (value <= 0) {
            throw new Error('O valor a ser debitado deve ser maior que zero!');
        }
        if (value > this.balance) {
            throw new Error('Saldo insuficiente!');
        }
        this.balance -= value;
        localStorage.setItem('balance', this.balance.toString());
    }
    deposit(value) {
        if (value <= 0) {
            throw new Error('O valor a ser depositado deve ser maior que zero!');
        }
        this.balance += value;
        localStorage.setItem('balance', this.balance.toString());
    }
    getTransactionsGroups() {
        const transactionsGroups = [];
        const transactionsList = structuredClone(this.transactions);
        const orderedTransactions = transactionsList.sort((t1, t2) => t2.date.getTime() - t1.date.getTime());
        let currentTransactionGroupLabel = '';
        for (const transaction of orderedTransactions) {
            const transactionGroupLabel = transaction.date.toLocaleDateString('pt-br', {
                month: 'long',
                year: 'numeric'
            });
            if (currentTransactionGroupLabel !== transactionGroupLabel) {
                currentTransactionGroupLabel = transactionGroupLabel;
                transactionsGroups.push({
                    label: transactionGroupLabel,
                    transactions: []
                });
            }
            transactionsGroups.at(-1).transactions.push(transaction);
        }
        return transactionsGroups;
    }
    registerTransaction(newTransaction) {
        if (newTransaction.transactionType === TransactionType.DEPOSIT) {
            this.deposit(newTransaction.value);
        }
        else if (newTransaction.transactionType === TransactionType.TRANSFER || newTransaction.transactionType === TransactionType.PAYMENT) {
            this.debit(newTransaction.value);
            newTransaction.value *= -1;
        }
        else {
            throw new Error('Tipo de transação é inválido!');
        }
        this.transactions.push(newTransaction);
        // console.log(this.getTransactionsGroups());
        localStorage.setItem('transactions', JSON.stringify(this.transactions));
    }
}
const account = new Account('Joana da Silva Oliveira');
export default account;
