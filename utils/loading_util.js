const loading = require('../utils/loading_util');

function beginLoading(option) {
    if (!option) {
        option = {};
    }
    if (!option.title) {
        option.title = '加载中，请稍后';
    }
    wx.showLoading(option)
}

function endLoading() {
    setTimeout(function () {
        wx.hideLoading()
    }, 800)
}

function wrapLoading(fn, option) {
    let r = fn();
    if (r instanceof Promise) {
        beginLoading(option);
        r.finally(endLoading);
        return r;
    } else {
        console.error('只有 fn 的结果为 Promise 时才会启用进度框')
    }
}

module.exports = {
    begin: beginLoading,
    end: endLoading,
    wrap: wrapLoading,
}