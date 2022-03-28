

class GlobalService {
    constructor(app) {
        this._app = app;
        this._data = {};
    }

    set(k, v) {
        this._data[k] = v;
    }

    get(k) {
        return this._data[k];
    }

    remove(k) {
        let v = get(k);
        this._data[k] = null;
        return v;
    }
}

const GlobalKey = {
    IndexBootstrap: 'INDEX_BOOTSTRAP',
    UserInfoChanged: 'USER_INFO_CHANGED',
}

module.exports = {
    GlobalService: GlobalService,
    GlobalKey: GlobalKey,

}