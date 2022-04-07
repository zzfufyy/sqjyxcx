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

const insertByEntity = function (submitData) {
    return $.request({
        url: '/recruit-job/add',
        data: submitData,
        method: $.RequestMethod.POST,
        header: $.jsonHeader
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

const pagedByDistance = function (pagingParam) {
    return $.requestOnlyData({
        url: '/recruit-job/paged-by-distance',
        data: pagingParam,
        method: $.RequestMethod.POST,
        header: $.jsonHeader,
    });
}

const pagedByDistanceAndSalary = function (jobName, jobSalaryMin, jobSalaryMax, pagingParam) {
    return $.requestOnlyData({
        url: '/recruit-job/paged-by-distance?jobName=' + jobName + '&jobSalaryMin=' + jobSalaryMin + '&jobSalaryMax=' + jobSalaryMax,
        data: pagingParam,
        method: $.RequestMethod.POST,
        header: $.jsonHeader,
    });
}
const increaseViewCount = function (jobUuid) {
    return $.request({
        url: '/recruit-job/increaseCountView?id=' + jobUuid,
        data: {},
        method: $.RequestMethod.GET,
        header: $.jsonHeader,
    });
}
const increaseCountApply = function (jobUuid) {
    return $.request({
        url: '/recruit-job/increaseCountApply?id=' + jobUuid,
        data: {},
        method: $.RequestMethod.GET,
        header: $.jsonHeader,
    });
}




// 接口暴露
module.exports = {
    loadEntityById: loadEntityById,
    loadListByCompanyUuid: loadListByCompanyUuid,
    updateByEntity: updateByEntity,
    insertByEntity: insertByEntity,
    pagedByDistance: pagedByDistance,
    pagedByDistanceAndSalary: pagedByDistanceAndSalary,
    increaseViewCount: increaseViewCount,
    increaseCountApply: increaseCountApply
}