import Account from '../types/Account.js';
import { formatDate } from '../utils/formatters.js';
import { DateFormat } from '../types/DateFormat.js';

const elemCurrentDate = document.querySelector('[data-current-date]') as HTMLElement;

function renderAccessDate(): void {
    elemCurrentDate.textContent = formatDate(Account.getAccessDate(), DateFormat.WEEKDAY_DAY_MONTH_YEAR);
}

renderAccessDate();

const AccessDateComponent = {
    update(): void {
        renderAccessDate();
    }
}

export default AccessDateComponent;