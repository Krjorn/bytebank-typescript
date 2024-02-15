import Account from '../types/Account.js';
import { DateFormat } from '../types/DateFormat.js';
import { TransactionGroup } from '../types/TransactionGroup.js';
import { formatCurrency, formatDate } from '../utils/formatters.js';

const elemTransactionsRegisterStatement: HTMLElement = document.querySelector('[data-transactions-register]');

function renderStatement(): void {
    const transactionsGroups: TransactionGroup[] = Account.getTransactionsGroups();
    elemTransactionsRegisterStatement.innerHTML = '';
    let htmlTransactionsRegister: string = '';

    for(const transactionGroup of transactionsGroups) {
        let htmlTransactionItems: string = '';

        for(const transaction of transactionGroup.transactions) {
            htmlTransactionItems += `
                <div class="transacao-item">
                    <div class="transacao-info">
                        <span class="tipo">${transaction.transactionType}</span>
                        <strong class="valor">${formatCurrency(transaction.value)}</strong>
                    </div>
                    <time class="data">${formatDate(transaction.date, DateFormat.DAY_MONTH)}</time>
                </div>
            `;
        }

        htmlTransactionsRegister += `
            <div class="transacoes-group">
                <strong class="mes-group">${transactionGroup.label}</strong>
                ${htmlTransactionItems}
            </div>
        `;
    }

    if(htmlTransactionsRegister === '') {
        htmlTransactionsRegister = '<span>Não há transações registradas.</span>'
    }

    elemTransactionsRegisterStatement.innerHTML = htmlTransactionsRegister;
}

renderStatement();

const StatementComponent = {
    update():void {
        renderStatement();
    }
}

export default StatementComponent;