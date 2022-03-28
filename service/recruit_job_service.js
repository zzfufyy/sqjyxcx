
const { Api } = require('../common/api');
const $ = require('../utils/request_util');

const RecruitJobService = {
    pagedByDistacne(pagingParam) {
        return $.requestOnlyData({
            url: Api.recruitJobPagedByDistance,
            data: pagingParam,
            method: $.RequestMethod.POST,
            header: $.jsonHeader,
        });
    },
};

module.exports = {
    RecruitJobService: RecruitJobService,
}