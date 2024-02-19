export class Storage {
    private constructor() {}

    static saveValue(key: string, value: any): void {
        const valueAsString = JSON.stringify(value);
        localStorage.setItem(key, valueAsString);
    }

    static getValue<T>(key: string, reviver?: (this: any, key: string, value: any) => any): T | null {
        const value = localStorage.getItem(key);

        if(value === null) {
            return null;
        }

        if(reviver) {
            return JSON.parse(value, reviver) as T;
        }

        return JSON.parse(value) as T;
    }
}