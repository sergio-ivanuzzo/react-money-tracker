class LocalStorageService {

    static get_from_storage(key, initialValue=[]) {
        return (window.localStorage.getItem(key)) ? JSON.parse(window.localStorage.getItem(key)) : initialValue;
    }

    static save_to_storage(key, newItems) {
        newItems = (Array.isArray(newItems)) ? JSON.stringify(newItems) : newItems;
        window.localStorage.setItem(key, newItems);
    }
}

export default LocalStorageService;