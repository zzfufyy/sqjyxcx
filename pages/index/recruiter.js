/// 首页用于加载招聘者用户信息的模块const { Api } = require('../../common/api');

const { Api } = require('../../common/api');
const { UserService } = require('../../service/user_service');
const { CompanyService } = require('../../service/company_service');

const loading = require('../../utils/loading_util');
const $ = require('../../utils/request_util');
const Constant = require('../../common/constant');

const app = getApp();

const createRecruiterMethods = () => ({

    goToCompanyWaitPage: function () {
        wx.navigateTo({
            url: '/pages/waiteyz/waiteyz',
        });
    },

    goToCompanyRegisterPage: function () {
        wx.navigateTo({
            url: '/pages/qyzc/qyzc',
        });
    },

    _handleRecruiterSelected: async function () {
        try {
            loading.begin();

            let userInfo = await UserService.loadRecruiterInfo();

            // 服务端有此人员数据
            if (userInfo != null) {
                console.info(`服务端有此招聘人员信息：${app.getOpenid()}`);

                let companyUuid = userInfo.companyUuid;
                // 该人员创建了公司
                if (companyUuid) {
                    let companyInfo = await CompanyService
                        .loadRecruiterCompanyInfo(companyUuid);

                    if (!companyInfo) {
                        console.error(`未知的公司信息[${companyUuid}]`);
                        this.goToCompanyRegisterPage();
                    }

                    // 认证完成
                    if (companyInfo.flagIdentification) {
                        console.info(`公司[${companyInfo.id}]认证完成`);
                        UserService.saveUserRole(Constant.UserRole.Recruiter);

                        this.setData({
                            juesehide: true,
                            ident: 'company',
                        });
                    }
                    // 还在认证
                    else {
                        console.info(`公司[${companyInfo.id}]认证中`);
                        this.goToCompanyWaitPage();
                    }
                }

                // 该人员还没有创建公司，跳转公司注册
                else {
                    console.info('此招聘人还没有公司');
                    this.goToCompanyRegisterPage();
                }
            }
            // 服务端没有此人数据
            else {
                console.info(`服务端没有此招聘人员信息：${app.getOpenid()}`);

                await this._commitRecruiterInfo();
                this.goToCompanyRegisterPage();
            }
        } catch (e) {
            console.error(e);
        } finally {
            loading.end();
        }
    },

    _commitRecruiterInfo: async function () {
        loading.begin();
        try {
            await $.request({
                url: Api.userRecruiterAdd,
                data: {
                    id: app.getOpenid(),
                },
                method: $.RequestMethod.POST,
                header: $.jsonHeader,
            });

            // Constant.saveUserRole(Constant.UserRole.Recruitee);
        } finally {
            loading.end();
        }


        this.setData({
            infows: true
        })
    },
});

module.exports = {
    createRecruiterMethods: createRecruiterMethods,
};

