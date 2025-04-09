function setItem<T>(key: string, value: T): void {
    const serializedValue = JSON.stringify(value);

    localStorage.setItem(key, serializedValue);
}

const getItem = (key: string) => {

    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;

}

const removeItem = (key: string) => {
    localStorage.removeItem(key);
}

export {setItem, getItem, removeItem};
