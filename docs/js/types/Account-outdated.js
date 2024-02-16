import { TransactionType } from './TransactionType.js';
let balance = JSON.parse(localStorage.getItem('balance')) || 0;
const transactions = JSON.parse(localStorage.getItem('transactions'), (key, value) => {
    if (key === 'date') {
        return new Date(value);
    }
    return value;
}) || [];
function debit(value) {
    if (value <= 0) {
        throw new Error('O valor a ser debitado deve ser maior que zero!');
    }
    if (value > balance) {
        throw new Error('Saldo insuficiente!');
    }
    balance -= value;
    localStorage.setItem('balance', balance.toString());
}
function deposit(value) {
    if (value <= 0) {
        throw new Error('O valor a ser depositado deve ser maior que zero!');
    }
    balance += value;
    localStorage.setItem('balance', balance.toString());
}
const Account = {
    getBalance() {
        return balance;
    },
    getAccessDate() {
        return new Date();
    },
    getTransactionsGroups() {
        const transactionsGroups = [];
        const transactionsList = structuredClone(transactions);
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
    },
    getTransactionsTotal() {
        const summary = {
            totalDeposit: 0,
            totalTransfer: 0,
            totalPayment: 0
        };
        for (const transaction of transactions) {
            switch (transaction.transactionType) {
                case TransactionType.DEPOSIT:
                    summary.totalDeposit += transaction.value;
                    break;
                case TransactionType.TRANSFER:
                    summary.totalTransfer += transaction.value;
                    break;
                case TransactionType.PAYMENT:
                    summary.totalPayment += transaction.value;
                    break;
                default:
                    break;
            }
        }
        return summary;
    },
    registerTransaction(newTransaction) {
        if (newTransaction.transactionType === TransactionType.DEPOSIT) {
            deposit(newTransaction.value);
        }
        else if (newTransaction.transactionType === TransactionType.TRANSFER || newTransaction.transactionType === TransactionType.PAYMENT) {
            debit(newTransaction.value);
            newTransaction.value *= -1;
        }
        else {
            throw new Error('Tipo de transação é inválido!');
        }
        transactions.push(newTransaction);
        // console.log(this.getTransactionsGroups());
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }
};
export default Account;
