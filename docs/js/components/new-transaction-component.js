import BalanceComponent from './balance-component.js';
import Account from '../types/Account.js';
import StatementComponent from './statement-component.js';
const elemForm = document.querySelector('[data-transaction-form]');
elemForm.addEventListener('submit', e => {
    try {
        e.preventDefault();
        if (!elemForm.checkValidity()) {
            alert('Por favor, preencha todos os campos de transação!');
            return;
        }
        const inputTransactionType = document.querySelector('#tipoTransacao');
        const inputValue = document.querySelector('#valor');
        const inputDate = document.querySelector('#data');
        const transactionType = inputTransactionType.value;
        const value = inputValue.valueAsNumber;
        const date = new Date(`${inputDate.value}T00:00`);
        const newTransaction = {
            transactionType,
            value,
            date
        };
        Account.registerTransaction(newTransaction);
        BalanceComponent.update();
        StatementComponent.update();
        elemForm.reset();
    }
    catch (e) {
        alert(e.message);
    }
});
