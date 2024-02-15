import { DateFormat } from '../types/DateFormat.js';
export function formatCurrency(value) {
    return value.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL'
    });
}
export function formatDate(date, format = DateFormat.DEFAULT) {
    if (format === DateFormat.WEEKDAY_DAY_MONTH_YEAR) {
        return date.toLocaleDateString('pt-br', {
            weekday: 'long',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }
    if (format === DateFormat.DAY_MONTH) {
        return date.toLocaleDateString('pt-br', {
            day: '2-digit',
            month: '2-digit'
        });
    }
    return date.toLocaleDateString('pt-br');
}
