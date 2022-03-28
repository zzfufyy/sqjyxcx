const { Salary } = require('../../common/constant');
const { UserService, user } = require('../../service/user_service');
const { GlobalKey } = require('../../service/global_service');

const Constant = require('../../common/constant');
const StringUtil = require('../../utils/string_util');
const loading = require('../../utils/loading_util');

const app = getApp();

const createRecruiteeMethods = () => ({
    loadRecruiteeInfo: async function () {
        loading.begin();

        try {
            // TODO: 在一个接口里获取所有信息
            let recruiteeInfo = await UserService.loadRcruiteeInfo();
            let userInfo = await UserService.loadUserInfo();

            if (!recruiteeInfo || !userInfo) {
                console.info(`服务端没有此求职者[${app.getOpenid()}]，清理本地信息，跳转首页`);
                await this._clearUserRole();
                app.setGlobal(GlobalKey.IndexBootstrap, true);
                wx.switchTab({
                    url: '/pages/index/index',
                });
            }
            // 有此用户
            else {
                console.info(`服务端有此求职者[${app.getOpenid()}]`);
                this.setData({
                    // 暂时只有一个数据
                    personinfo: [{
                        tximg: StringUtil.getSROD(
                            recruiteeInfo.portraitPath,
                            userInfo.avatarurl,
                        ),
                        name: StringUtil.emptyBlocking(
                            recruiteeInfo.realName,
                            userInfo.nickname,
                        ),
                        sex: Constant.genderList[recruiteeInfo.gender],
                        // TODO: 实现年龄, 电话，工作意向
                        //year: '23',
                        cellphone: StringUtil.maybeEmptyString(recruiteeInfo.telephone),
                        jobname: '保洁人员',
                        money: new Salary(
                            recruiteeInfo.expectSalaryMin,
                            recruiteeInfo.expectSalaryMax,
                        ).value,
                        msgw: '34',
                        ytdgw: '127',
                        byll: recruiteeInfo.countView,
                    }],
                });
                UserService.saveUserRole(Constant.UserRole.Recruitee, true);
            }
        } catch (e) {
            console.error(e);
        } finally {
            loading.end();
        }
    }
});


module.exports = {
    createRecruiteeMethods: createRecruiteeMethods,
}