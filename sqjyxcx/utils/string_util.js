function isEmpty(param) {
    if (typeof (param) === "undefined" || param === null || param.trim().length == 0) {
        return true;
    }
}

function splitBySemiColon(str) {
    return str.split(";").filter(s => !isEmpty(s));
}

function emptyBlocking(value, onEmpty) {
    if (isEmpty(value)) {
        return onEmpty;
    }
    return value;
}

/**
 * 检查传入的头像字符串，如果为空串，使用 OnEmpty
 * 否则，在给定的值前拼接服务端的地址 app.globalData.web_path
 * 
 */
function getServerResourceOrDefault(value, onEmpty) {
    if (isEmpty(value)) {
        return onEmpty;
    }
    return getApp().globalData.web_path + value;
}

/**
 * 将给定的字符串值（可以是null或者undefined）以合理的形式返回
 * 即，如果给定 null 或 undefined，返回 空串 ''（或者给定的 onEmpty）,
 * 否则返回原字符串
 * 
 * @param {*} value 原来的字符串值（可以为 null 或者 undefined）
 * @param {*} onEmpty 在原串不合理的时候的替代值
 */
function maybeEmptyString(value, onEmpty) {
    if (value === null || value === undefined) {
        if (onEmpty && onEmpty instanceof String) {
            return onEmpty
        } else {
            return '';
        }
    } else {
        return value;
    }
}

function meterToKiloMeterString(meter) {
    return (meter / 1000.0).toFixed(2);
}

module.exports = {
    isEmpty: isEmpty,
    splitBySemiColon: splitBySemiColon,
    getSROD: getServerResourceOrDefault,
    emptyBlocking: emptyBlocking,
    maybeEmptyString: maybeEmptyString,
    meterToKiloMeterString: meterToKiloMeterString,
};