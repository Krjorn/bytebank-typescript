import Account from '../types/Account.js';
import { formatCurrency } from '../utils/formatters.js';

const elemBalance = document.querySelector('[data-balance]') as HTMLElement;

function renderBalance(): void {
    elemBalance.textContent = formatCurrency(Account.getBalance());
}

renderBalance();

const BalanceComponent = {
    update(): void {
        renderBalance();
    }
}

export default BalanceComponent;