/// 首页用于加载招聘者用户信息的模块const { Api } = require('../../common/api');

const { Api } = require('../../common/api');
const { UserService } = require('../../service/user_service');
const { CompanyService } = require('../../service/company_service');
// const { Age} = require('../../common/constant');
const date_utils = require('../../utils/date_utils');
const Loading = require('../../utils/loading_util');
const $ = require('../../utils/request_util');
const Constant = require('../../common/constant');

const userCandidateService = require('../../common/userCandidateService');

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
            Loading.begin();

            let userInfo = await UserService.loadRecruiterInfo();

            // 服务端有此人员数据
            if (userInfo != null) {
                console.info(`服务端有此招聘人员信息：${app.getOpenid()}`);

                let companyUuid = userInfo.companyUuid;
                this.setData({ companyUuid: companyUuid });
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
                            companyUuid: companyInfo.id,
                        });
                        this.state.userRoleCompl.resolve();
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
            Loading.end();
        }
    },

    _commitRecruiterInfo: async function () {
        Loading.begin();
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
            Loading.end();
        }


        this.setData({
            infows: true
        })
    },

    // 加载求职用户应该看到的工作信息
    _loadCandidateList: async function () {

        console.log('加载首页求职者列表');
        let pageConfig = this._getPageConfig();
        console.log(pageConfig);
        let location = this._getLocation();
        let pagingParam = pageConfig.buildNextParam({
            longitude: location.longitude,
            latitude: location.latitude,
        });

        if (!pagingParam) {
            return;
        }

        let pageInfo;
        try {
            Loading.begin();
            // 请求数据
            pageInfo = await userCandidateService.pagedByDistacne(pagingParam);
        } catch (e) {
            console.error(e);
        } finally {
            Loading.end();
        }

        // {
        //     jobname: '服务员/保洁', usertag: [{ tagbq: '女' }, { tagbq: '29岁' }, { tagbq: '3000-5000/月' }],
        //     name: '李四', tximg: '/img/tx.png', hxtime: '10分钟前', sqname: '天源社区', companyjuli: '1.2',
        //   },
        // pageConifg 保存当前的分页信息，并且取出 pageInfo 中的 list
        let dataList = pageConfig.handlePageInfo(pageInfo);
        let current = this.data.compangjob;
        console.log(this.data);
        console.log("######################");
        console.log(dataList);
        var that = this;
        for(let i=0;i<dataList.length;i++){
            wx.request({
              url: app.globalData.web_path + '/view-record/getjobs',
              data: {
                openid:dataList[i].candidateOpenid,
                jobid:dataList[i].expectCategoryId,
              },
              header: app.globalData.header,
              success: function (res) {
                  console.log(res)
              }
            })
        }
        let newList = dataList.map(r => ({
            candidateOpenid: r.candidateOpenid,
            expectCatagoryId: r.expectCategoryId,
            expectCommunityId : r.expectCommunityId,
            jobname: r.expectCatagoryId, // 暂时用id代替
            usertag:[{tagbq:Constant.genderList[r.gender]},
                     {tagbq:date_utils.getAgeByBirthday(r.birthday)},
                     {tagbq:new Constant.Salary(r.expectSalaryMin,r.expectSalaryMax).value + '/月'}],
            name: r.realName,
            tximg:r.candidatePortraitPath,
            hxtime: '', // 10分钟前 暂时忽略
            sqname: r.communityName,
            companyjuli: (r.distance/1000).toFixed(1),
        }));
        this.setData({
            compangjob: current.concat(
                newList,
            ),
        });


    },
});




module.exports = {
    createRecruiterMethods: createRecruiterMethods,
};

