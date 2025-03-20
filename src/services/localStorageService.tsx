function setItem<T>(key: string, value: T): void {
    const serializedValue = JSON.stringify(value);

    localStorage.setItem(key, serializedValue);
}

const getItem = (key: string) => {

    return JSON.parse(localStorage.getItem(key) as string) ?? "";

}

const removeItem = (key: string) => {
    localStorage.removeItem(key);
}

export {setItem, getItem, removeItem};
