import Account from '../types/Account.js';
import { DateFormat } from '../types/DateFormat.js';
import { formatCurrency, formatDate } from '../utils/formatters.js';
const elemTransactionsRegisterStatement = document.querySelector('[data-transactions-register]');
function renderStatement() {
    const transactionsGroups = Account.getTransactionsGroups();
    elemTransactionsRegisterStatement.innerHTML = '';
    let htmlTransactionsRegister = '';
    for (const transactionGroup of transactionsGroups) {
        let htmlTransactionItems = '';
        for (const transaction of transactionGroup.transactions) {
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
    if (htmlTransactionsRegister === '') {
        htmlTransactionsRegister = '<span>Não há transações registradas.</span>';
    }
    elemTransactionsRegisterStatement.innerHTML = htmlTransactionsRegister;
}
renderStatement();
const StatementComponent = {
    update() {
        renderStatement();
    }
};
export default StatementComponent;
