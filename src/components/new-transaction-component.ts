import { TransactionType } from '../types/TransactionType.js';
import { Transaction } from '../types/Transaction.js';
import BalanceComponent from './balance-component.js';
import Account from '../types/Account.js';
import StatementComponent from './statement-component.js';

const elemForm = document.querySelector('[data-transaction-form]') as HTMLFormElement;
elemForm.addEventListener('submit', e => {
    try {
        e.preventDefault();

        if(!elemForm.checkValidity()) {
            alert('Por favor, preencha todos os campos de transação!');
            return;
        }

        const inputTransactionType = document.querySelector('#tipoTransacao') as HTMLSelectElement;
        const inputValue = document.querySelector('#valor') as HTMLInputElement;
        const inputDate = document.querySelector('#data')  as HTMLInputElement;

        const transactionType: TransactionType = inputTransactionType.value as TransactionType;
        const value: number = inputValue.valueAsNumber;
        const date: Date = new Date(`${inputDate.value}T00:00`);

        const newTransaction: Transaction = {
            transactionType,
            value,
            date
        }

        Account.registerTransaction(newTransaction);
        BalanceComponent.update();
        StatementComponent.update();
        elemForm.reset();
    } catch(e) {
        alert(e.message);
    }
});