class LocalStorageService {

    static init_storage(keys) {
        keys.forEach(key => {
            if (!window.localStorage.getItem(key)) {
                window.localStorage.setItem(key, JSON.stringify([]));
            }
        })
    }

    static get_from_storage(key) {
        let items = [];
        if (window.localStorage.getItem(key)) {
            items = JSON.parse(window.localStorage.getItem(key));
        }

        return items;
    }

    static save_to_storage(key, newItems) {
        window.localStorage.setItem(key, JSON.stringify(newItems));
    }
}

export default LocalStorageService;