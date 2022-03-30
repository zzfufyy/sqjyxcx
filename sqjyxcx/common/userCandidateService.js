const $ = require('../utils/request_util')


const loadEntityById = function (id) {
    return $.request({
        url: '/user-candidate/info?openid=' + openid,
        data: {},
        method: $.RequestMethod.GET,
        header: $.jsonHeader,
    });
}

const updateByEntity = function (updateData) {
    return $.request({
        url: '/user-candidate/modify',
        data: updateData,
        method: $.RequestMethod.POST,
        header: $.jsonHeader
    });
}

const pagedByDistacne = function (pagingParam) {
    return $.requestOnlyData({
        url: '/user-candidate/paged-by-distance',
        data: pagingParam,
        method: $.RequestMethod.POST,
        header: $.jsonHeader,
    });

}


module.exports = {
    loadEntityById: loadEntityById,
    updateByEntity: updateByEntity,
    pagedByDistacne:pagedByDistacne,
}