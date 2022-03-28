const { Api } = require('../common/api');
const $ = require('../utils/request_util');

const CompanyService = {
    loadRecruiterCompanyInfo: function (uuid) {
        return $.requestOnlyData({
            url: Api.recruiterCompanyInfo,
            data: {
                // 公司的 uuid
                id: uuid
            },
        });
    }
};


module.exports = {
    CompanyService: CompanyService,
}