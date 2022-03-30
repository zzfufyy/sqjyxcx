const $ = require('../utils/request_util')


const loadEntityById = function (id) {
    return $.request({
        url: '/information-news/info?id=' + id,
        data: {},
        method: $.RequestMethod.GET,
        header: $.jsonHeader
    })
}

const updateByEntity = function(informationNews){
    return $.request({
        url: '/information-news/modify',
        data: informationNews,
        method: $.RequestMethod.POST,
        header: $.jsonHeader,
    });
}

const loadListOrderByReleaseTime = function(){
    return $.request({
        url: '/information-news/listOrderByReleaseTime',
        data: {},
        method: $.RequestMethod.GET,
        header: $.jsonHeader,
    });
}


module.exports = {
    loadEntityById: loadEntityById,
    updateByEntity: updateByEntity,
    loadListOrderByReleaseTime:loadListOrderByReleaseTime,
}