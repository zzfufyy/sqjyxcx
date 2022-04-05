// 处理url映射问题


const isImageUrlInServer = function (url) {
    return url.substr(0, 1) == '/' ? true : false
}

module.exports = {
    isImageUrlInServer: isImageUrlInServer,
}