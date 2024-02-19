export function ValidateDebit(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (debitValue) {
        if (debitValue <= 0) {
            throw new Error('O valor a ser debitado deve ser maior que zero!');
        }
        if (debitValue > this.balance) {
            throw new Error('Saldo insuficiente!');
        }
        return originalMethod.apply(this, [debitValue]);
    };
    return descriptor;
}
export function ValidateDeposit(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (depositValue) {
        if (depositValue <= 0) {
            throw new Error('O valor a ser depositado deve ser maior que zero!');
        }
        return originalMethod.apply(this, [depositValue]);
    };
    return descriptor;
}
