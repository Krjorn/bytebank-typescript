import Account from '../types/Account.js';
import { formatDate } from '../utils/formatters.js';
import { DateFormat } from '../types/DateFormat.js';
const elemCurrentDate = document.querySelector('[data-current-date]');
function renderAccessDate() {
    elemCurrentDate.textContent = formatDate(Account.getAccessDate(), DateFormat.WEEKDAY_DAY_MONTH_YEAR);
}
renderAccessDate();
const AccessDateComponent = {
    update() {
        renderAccessDate();
    }
};
export default AccessDateComponent;
