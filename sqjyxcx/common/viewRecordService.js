const $ = require('../utils/request_util')


const loadEntityById = function (id) {
    return $.request({
        url: '/view-record/info?id=' + id,
        data: {},
        method: $.RequestMethod.GET,
        header: $.jsonHeader,
    });
}

const insertByEntity = function (insertData) {
    return $.request({
        url: '/view-record/add',
        data: insertData,
        method: $.RequestMethod.POST,
        header: $.jsonHeader,
    })
}

const pagedByDistance = function (pagingParam) {
    return $.requestOnlyData({
        url: '/view-record/paged-by-distance',
        data: pagingParam,
        method: $.RequestMethod.POST,
        header: $.jsonHeader,
    });
}



const countByCandidateOpenid = function (candidateOpenid) {
    return $.request({
        url: '/view-record/countByCandidateOpenid?candidateOpenid=' + candidateOpenid,
        data: {},
        method: $.RequestMethod.GET,
        header: $.jsonHeader,
    });
}
module.exports = {
    loadEntityById: loadEntityById,
    insertByEntity: insertByEntity,
    pagedByDistance: pagedByDistance,
    countByCandidateOpenid: countByCandidateOpenid
}