/// 首页用于保存求职者用户信息的模块
const { UserService } = require('../../service/user_service');
const { RecruitJobService } = require('../../service/recruit_job_service');

const Constant = require('../../common/constant');
const Loading = require('../../utils/loading_util');

const $ = require('../../utils/request_util');
const StringUtil = require('../../utils/string_util');

const app = getApp();

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
    jobInfoList: [],
});




// TODO: 输入校验
const createRecruiteeMethods = () => ({
    // 以 handle 开头的函数均为处理界面中的数据绑定，
    // 例如 bindTap，bindInput 等
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
    handleSelectGender(e) {
        let that = this;
        let index = e.currentTarget.dataset.index1;
        console.debug(`性别设置为 [${index}]: ${Constant.genderList[index]}`);
        that.setData({
            gender: index
        })
    },

    // 选择薪资
    handleSelectSalary(e) {
        let that = this;
        let index = e.currentTarget.dataset.index3;
        console.debug(`性别设置为 [${index}]: ${Constant.salaryList[index].value}`);
        that.setData({
            salary: index
        })
    },

    // 从 data 中获取 提交给服务端的 信息
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

    // 提交求职者信息
    commitRecruiteeInfo: async function () {
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
            this.state.userRoleCompl.resolve();
        }


        this.setData({
            infows: true
        });
    },

    // 角色选择时，用户点击选择求职者
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

                // 加载角色选择完成
                this.state.userRoleCompl.resolve();

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

    // 加载求职用户应该看到的工作信息
    _loadJobList: async function () {

        console.debug('加载首页工作列表');
        let pageConfig = this._getPageConfig();

        // TODO： 获取求职用户的位置（或者是默认的位置（如市中心等））
        let pagingParam = pageConfig.buildNextParam({
            longitude: 112.9389, latitude: 28.0,
        });

        if (!pagingParam) {
            return;
        }

        let pageInfo;
        try {
            Loading.begin();
            // 请求数据
            pageInfo = await RecruitJobService.pagedByDistacne(pagingParam);
        } catch (e) {
            console.error(e);
        } finally {
            Loading.end();
        }

        // pageConifg 保存当前的分页信息，并且取出 pageInfo 中的 list
        let dataList = pageConfig.handlePageInfo(pageInfo);

        // 当前的列表数据， 用于之后的列表拼接
        let current = this.data.jobInfoList;

        // 将服务端的数据映射成页面展示数据
        let newList = dataList.map(jobInfo => ({
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
        }));

        // 刷新页面
        this.setData({
            jobInfoList: current.concat(
                newList,
            ),
        });
    }
});

module.exports = {
    createRecruiteeMethods: createRecruiteeMethods,
    createRecruiteeInfo: createRecruiteeData,
};

