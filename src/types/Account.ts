import { Storage } from '../utils/Storage.js';
import { ValidateDebit, ValidateDeposit } from './Decorators.js';
import { Transaction } from './Transaction.js';
import { TransactionGroup } from './TransactionGroup.js';
import { TransactionType } from './TransactionType.js';

export class Account {
    protected name: string;
    protected balance: number = Storage.getValue<number>('balance') || 0;
    private transactions: Transaction[] = Storage.getValue<Transaction[]>('transactions', (key: string, value: any) => {
        if(key === 'date') {
            return new Date(value);
        }

        return value;
    }) || [];

    public constructor(name: string) {
        this.name = name;
    }

    public getHolder(): string {
        return this.name;
    }

    public getBalance(): number {
        return this.balance;
    }

    public getAccessDate(): Date {
        return new Date();
    }

    @ValidateDebit
    protected debit(value: number): void {
        this.balance -= value;
        Storage.saveValue('balance', this.balance);
    }

    @ValidateDeposit
    protected deposit(value: number): void {
        this.balance += value;
        Storage.saveValue('balance', this.balance);
    }

    public getTransactionsGroups(): TransactionGroup[] {
        const transactionsGroups: TransactionGroup[] = [];
        const transactionsList: Transaction[] = structuredClone(this.transactions);
        const orderedTransactions: Transaction[] = transactionsList.sort((t1, t2) => t2.date.getTime() - t1.date.getTime());
        let currentTransactionGroupLabel: string = '';

        for(const transaction of orderedTransactions) {
            const transactionGroupLabel: string = transaction.date.toLocaleDateString('pt-br', {
                month: 'long',
                year: 'numeric'
            });

            if(currentTransactionGroupLabel !== transactionGroupLabel) {
                currentTransactionGroupLabel = transactionGroupLabel;

                transactionsGroups.push({
                    label: transactionGroupLabel,
                    transactions: []
                })
            }

            transactionsGroups.at(-1).transactions.push(transaction);
        }

        return transactionsGroups;
    }

    public registerTransaction(newTransaction: Transaction): void {
        if(newTransaction.transactionType === TransactionType.DEPOSIT) {
            this.deposit(newTransaction.value);
        } else if(newTransaction.transactionType === TransactionType.TRANSFER || newTransaction.transactionType === TransactionType.PAYMENT) {
            this.debit(newTransaction.value);
            newTransaction.value *= -1;
        } else {
            throw new Error('Tipo de transação é inválido!');
        }

        this.transactions.push(newTransaction);
        // console.log(this.getTransactionsGroups());
        Storage.saveValue('transactions', this.transactions);
    }
}

export class PremiumAccount extends Account {
    public registerTransaction(transaction: Transaction): void {
        if(transaction.transactionType === TransactionType.DEPOSIT) {
            console.log('Ganhou um bônus de 50 centavos!');
            transaction.value += .5;
        }

        super.registerTransaction(transaction);
    }
}

const account: Account = new Account('Joana da Silva Oliveira');
const premiumAccount: PremiumAccount = new PremiumAccount('Lavinia Souza Barbosa');

export default account;