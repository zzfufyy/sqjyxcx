const $ = require('../utils/request_util')


const loadListByCompanyUuid = function (companyUuid) {
    return $.request({
        url: '/recruit-job/listByCompanyUuid?companyUuid=' + companyUuid,
        data: {},
        method: $.RequestMethod.POST,
        header: $.jsonHeader
    })
}

const loadEntityById = function (id) {
    return $.request({
        url: '/recruit-job/info?id=' + id,
        data: {},
        method: $.RequestMethod.GET,
        header: $.jsonHeader,
    });
}


const updateByEntity = function (updateData) {
    return $.request({
        url: '/recruit-job/modify',
        data: updateData,
        method: $.RequestMethod.POST,
        header: $.jsonHeader
    });
}

module.exports = {
    loadEntityById:loadEntityById,
    loadListByCompanyUuid: loadListByCompanyUuid,
    updateByEntity: updateByEntity,
}