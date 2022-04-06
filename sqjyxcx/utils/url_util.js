// 处理url映射问题

const isImageUrlInServer = function (url) {
    if (typeof (url) === "undefined" || url === null || url.length == 0) {
        return false;
    }else{
        return url.substr(0, 1) == '/' ? true : false
    }
}

module.exports = {
    isImageUrlInServer: isImageUrlInServer,
}