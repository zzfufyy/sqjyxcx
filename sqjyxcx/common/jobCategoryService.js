const $ = require('../utils/request_util')


const loadList = function (categoryName) {
    return $.request({
        url: '/job-category/list',
        data: {
            categoryName: categoryName,
        },
        method: $.RequestMethod.POST,
        header: $.jsonHeader
    })
}

module.exports = {
    loadList: loadList,
}