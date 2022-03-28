// 节流
function throttle(func, wait) {
    let timeout = null;

    return function () {
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null;
                func.call(this, arguments);
            }, wait);
        }
    }
}

// 防抖
function debounce(func, wait) {
    let timeout = null;

    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            func();
        }, wait);
    }
}

/** 
 * 完成器，以手动的方式 完成、拒绝 Promise 回调
 */
class Completer {
    constructor() {
        this.promise = new Promise(
            (resolve, reject) => {
                this.resolve = (v) => resolve(v);
                this.reject = (e) => reject(e);
            }
        );
    }
}

class Listenable {
    constructor() {
        this._listeners = new Array();
    }

    addListener(listener) {
        this._listeners.push(listener);
    }

    removeListener(listener) {
        let index = this._listeners.indexOf(listener);
        if (index > -1) {
            this._listeners.splice(index, 1);
        }
    }

    notifyListeners(v) {
        this._listeners.forEach(lsr => lsr(v));
    }
}



module.exports = {
    throttle: throttle,
    debounce: debounce,
    Completer: Completer,
    Listenable: Listenable,
}
