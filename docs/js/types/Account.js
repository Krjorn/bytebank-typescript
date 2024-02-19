var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Storage } from '../utils/Storage.js';
import { ValidateDebit, ValidateDeposit } from './Decorators.js';
import { TransactionType } from './TransactionType.js';
export class Account {
    name;
    balance = Storage.getValue('balance') || 0;
    transactions = Storage.getValue('transactions', (key, value) => {
        if (key === 'date') {
            return new Date(value);
        }
        return value;
    }) || [];
    constructor(name) {
        this.name = name;
    }
    getHolder() {
        return this.name;
    }
    getBalance() {
        return this.balance;
    }
    getAccessDate() {
        return new Date();
    }
    debit(value) {
        this.balance -= value;
        Storage.saveValue('balance', this.balance);
    }
    deposit(value) {
        this.balance += value;
        Storage.saveValue('balance', this.balance);
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
        Storage.saveValue('transactions', this.transactions);
    }
}
__decorate([
    ValidateDebit
], Account.prototype, "debit", null);
__decorate([
    ValidateDeposit
], Account.prototype, "deposit", null);
export class PremiumAccount extends Account {
    registerTransaction(transaction) {
        if (transaction.transactionType === TransactionType.DEPOSIT) {
            console.log('Ganhou um bônus de 50 centavos!');
            transaction.value += .5;
        }
        super.registerTransaction(transaction);
    }
}
const account = new Account('Joana da Silva Oliveira');
const premiumAccount = new PremiumAccount('Lavinia Souza Barbosa');
export default account;
