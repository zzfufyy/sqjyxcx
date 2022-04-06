
const { UserService } = require('../../service/user_service');
const { CompanyService } = require('../../service/company_service');
const { GlobalKey } = require('../../service/global_service');

const Constant = require('../../common/constant');
const StringUtil = require('../../utils/string_util');
const loading = require('../../utils/loading_util');

const app = getApp();

const createRecruiterMethods = () => ({
    loadRecruiterInfo: async function () {
        loading.begin();

        async function failback(title) {
            console.info(title);
            // await this._handleRecruiterSelected();
            await UserService.clearUserRole();
            app.setGlobal(GlobalKey.IndexBootstrap, true);
            wx.switchTab({
                url: '/pages/index/index',
            });
        }

        try {
            // TODO: 在一个接口里获取所有信息
            let recruiterInfo = await UserService.loadRecruiterInfo();
            console.log(recruiterInfo)
            if (!recruiterInfo) {
                return failback(
                    `服务端没有此招聘人[${app.getOpenid()}]信息，清理本地信息，跳转首页`
                );
            }

            if (!recruiterInfo.companyUuid) {
                return failback(
                    `此招聘人没有[${app.getOpenid()}]公司信息，清理本地信息，跳转首页`
                );
            }

            let companyInfo = await CompanyService.loadRecruiterCompanyInfo(
                recruiterInfo.companyUuid,
            );

            if (!companyInfo) {
                return failback(
                    `服务端没有此招聘人[${app.getOpenid()}] 公司 [${companyInfo.companyUuid}] 信息，清理本地信息，跳转首页`
                );
            }

            let userInfo = await UserService.loadUserInfo();
            if (!userInfo) {
                return failback(
                    `服务端没有此用户[${app.getOpenid()}]公司信息，清理本地信息，跳转首页`
                );
            }

            // 信息加载完成
            console.info(`服务端有此招聘者 [${app.getOpenid()}]，公司[${companyInfo.id}]`);

            this.setData({
                // 暂时只有一个数据
                companyinfo: [{
                    tximg: StringUtil.getSROD(
                        companyInfo.portraitPath,
                        userInfo.avatarurl,
                    ),
                    name: StringUtil.emptyBlocking(
                        recruiterInfo.realName,
                        userInfo.nickname
                    ),
                    companyname: companyInfo.companyName,
                }],
            });
            UserService.saveUserRole(Constant.UserRole.Recruiter, true);

        } catch (e) {
            console.error(e);
        } finally {
            loading.end();
        }
    }
});


module.exports = {
    createRecruiterMethods: createRecruiterMethods,
}