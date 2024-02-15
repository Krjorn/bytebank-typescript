import Account from '../types/Account.js';
import { formatCurrency } from '../utils/formatters.js';
const elemBalance = document.querySelector('[data-balance]');
function renderBalance() {
    elemBalance.textContent = formatCurrency(Account.getBalance());
}
renderBalance();
const BalanceComponent = {
    update() {
        renderBalance();
    }
};
export default BalanceComponent;
