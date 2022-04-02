const $ = require('../utils/request_util')

const insertByEntityList = function (list ){
    return $.request({
        url: '/company-for-category/add',
        data: list,
        method: $.RequestMethod.POST,
        header: $.jsonHeader,
    });
};


module.exports = {
    insertByEntityList: insertByEntityList,
}