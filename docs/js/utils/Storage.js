export class Storage {
    constructor() { }
    static saveValue(key, value) {
        const valueAsString = JSON.stringify(value);
        localStorage.setItem(key, valueAsString);
    }
    static getValue(key, reviver) {
        const value = localStorage.getItem(key);
        if (value === null) {
            return null;
        }
        if (reviver) {
            return JSON.parse(value, reviver);
        }
        return JSON.parse(value);
    }
}
