/// 首页用于保存求职者用户信息的模块
const { UserService } = require('../../service/user_service');
const { RecruitJobService } = require('../../service/recruit_job_service');

const Constant = require('../../common/constant');
const Loading = require('../../utils/loading_util');
const Paging = require('../../utils/paging_util');
const $ = require('../../utils/request_util');
const StringUtil = require('../../utils/string_util');

const app = getApp();

const jobInfoListPageConfig = new Paging.PageConfig();

// 招聘人信息
const createRecruiteeData = () => ({
    // 注册信息
    realName: null,
    identityCard: null,
    gender: 0,
    // salaryList index
    salary: 0,
    expectCatagoryId: [],
    expectSalaeryMin: 0,
    expectSalaeryMax: 0,
    genderList: Constant.genderList,
    salaryList: Constant.salaryList,

    // 数据信息
    jobInfoPageConfig: jobInfoListPageConfig,
    jobInfoList: [],
});

// TODO: 输入校验
const createRecruiteeMethods = () => ({
    handleRealName: function (e) {
        var value = e.detail.value;
        this.setData({
            realName: value,
        });
    },
    handleIdentityCard: function (e) {
        var value = e.detail.value;
        this.setData({
            identityCard: value,
        });
    },
    // 选择性别
    selectGender(e) {
        let that = this;
        let index = e.currentTarget.dataset.index1;
        console.debug(`性别设置为 [${index}]: ${Constant.genderList[index]}`);
        that.setData({
            gender: index
        })
    },
    // 选择薪资
    selectSalary(e) {
        let that = this;
        let index = e.currentTarget.dataset.index3;
        console.debug(`性别设置为 [${index}]: ${Constant.salaryList[index].value}`);
        that.setData({
            salary: index
        })
    },
    // 提交信息
    _getRecruiteeInfo() {
        let data = this.data;
        let salary = Constant.salaryList[data.salary];
        return {
            // id 即是 open id
            id: wx.getStorageSync('openid'),
            realName: data.realName,
            identityCard: data.identityCard,
            gender: data.gender,
            expectSalaryMin: salary.min,
            expectSalaryMax: salary.max,
        }
    },
    commitRecruitInfo: async function () {
        let recruiteeInfo = this._getRecruiteeInfo();

        Loading.begin();
        try {
            await $.request({
                url: '/user-candidate/add',
                data: recruiteeInfo,
                method: $.RequestMethod.POST,
                header: $.jsonHeader,
            });

            UserService.saveUserRole(Constant.UserRole.Recruitee);
            this.setData({
                ident: 'user'
            });
        } finally {
            Loading.end();
        }


        this.setData({
            infows: true
        });
    },

    _handleRecruiteeSelected: async function () {
        try {
            Loading.begin();
            let res = await UserService.loadRcruiteeInfo();
            if (!res) {
                console.debug(`服务端没有此求职者信息: ${app.getOpenid()}`);
                this.setData({
                    juesehide: true,
                    // 做实名验证
                    smhide: false,
                    ident: 'user'
                });
            } else {
                console.debug(`服务端已经有此求职者信息: ${app.getOpenid()}`);
                this.setData({
                    juesehide: true,
                    smhide: true,
                    ident: 'user',
                });
                // 保存登录角色信息
                UserService.saveUserRole(Constant.UserRole.Recruitee);
            }
        }

        catch (e) {
            console.error(e);
        }
        finally {
            Loading.end();
        }
    },

    _loadJobList: async function () {
        debugger
        let jobInfoPageConfig = jobInfoListPageConfig;
        console.log(this.data);

        let pagingParam = jobInfoPageConfig.buildNextParam({
            longitude: 112.9389, latitude: 28.0,
        });

        let data = await RecruitJobService.pagedByDistacne(pagingParam);
        jobInfoPageConfig.handlePageInfo(data.pageInfo);

        let current = this.data.jobInfoList;
        this.setData({
            jobInfoList: current.concat(
                data.list.map(jobInfo => ({
                    jobname: jobInfo.jobName,
                    jobmoney: new Constant.Salary(
                        jobInfo.jobSalaryMin,
                        jobInfo.jobSalaryMax,
                    ).value,
                    companyname: jobInfo.companyName,
                    companytx: StringUtil.getSROD(
                        jobInfo.portraitPath,
                        'img/tx.png'
                    ),
                    jl: StringUtil.meterToKiloMeterString(jobInfo.distance),
                    //phonenum: '13112345678'
                }))
            ),
        });
    }
});

module.exports = {
    createRecruiteeMethods: createRecruiteeMethods,
    createRecruiteeInfo: createRecruiteeData,
};

