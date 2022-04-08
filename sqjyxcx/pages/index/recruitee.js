/// 首页用于保存求职者用户信息的模块
const { UserService } = require('../../service/user_service');
const { RecruitJobService } = require('../../service/recruit_job_service');

const Constant = require('../../common/constant');
const Loading = require('../../utils/loading_util');

const $ = require('../../utils/request_util');
const string_util = require('../../utils/string_util');

const userCandidateService = require('../../common/userCandidateService');
const candidateForCategoryService = require('../../common/candidateForCategoryService');
const { Salary } = require('../../common/constant');

const app = getApp();

// 招聘人信息
const createRecruiteeData = () => ({
    // 注册信息
    realName: '',
    identityCard: '',
    gender: 0,
    // salaryList index
    salary: 0,
    expectCatagoryId: [],
    expectSalaeryMin: 0,
    expectSalaeryMax: 0,
    genderList: Constant.genderList,
    salaryList: Constant.salaryList,
    // 期望职业
    wantjob: [
        { job: '保洁', id: 1, }, { job: '服务员', id: 2, }, { job: '保安', id: 3 }, { job: '保姆', id: 4 },
    ],
    // 数据信息
    jobInfoList: [],
});




// TODO: 输入校验
const createRecruiteeMethods = () => ({

    // 实名认证 - 真实姓名
    handleRealName: function (e) {
        var value = e.detail.value;
        this.setData({
            realName: value,
        });
    },
    // 实名认证 -  身份证
    handleIdentityCard: function (e) {
        var value = e.detail.value;
        this.setData({
            identityCard: value,
        });
    },
    //实名认证 - 提交
    async submitRealUser(e) {
        Loading.begin();
        if (string_util.isEmpty(this.data.realName)) {
            wx.showModal({
                title: '提示',
                content: '输入姓名不能为空',
            });
            return;
        }
        if (string_util.isEmpty(this.data.identityCard)) {
            wx.showModal({
                title: '提示',
                content: '输入身份证号码不能为空',
            });
            return;
        }

        let updateData = {
            id: wx.getStorageSync('openid'),
            realName: this.data.realName,
            identityCard: this.data.identityCard,
        }
        await userCandidateService.updateByEntity(updateData);
        Loading.end();
        // 跳入完善信息
        this.setData({
            smhide: true,
            infows: false
        })
    },
    // 完善信息 - 选择 期望工作 仅能选3个
    handleSelectCategory(e) {
        let id = e.currentTarget.dataset.id;
        let wantjobList = this.data.wantjob;
        let currentObj = wantjobList.find(r => {
            return r.id == id;
        })
        // 如果大于3 就提示
        if (currentObj.checked == false) {
            let num = 0;
            wantjobList.forEach(v => {
                if (v.checked == true) {
                    num = num + 1;
                }
            })
            if (num == 3) {
                wx.showModal({
                    title: '提示',
                    content: '不能选择超过3个想从事的工作',
                })
                return;
            } else {
                wantjobList = wantjobList.map(v => {
                    if (v.id == e.currentTarget.dataset.id) {
                        v.checked = true;
                    }
                    return v;
                })
            }
        } else {
            wantjobList = wantjobList.map(v => {
                if (v.id == id) {
                    v.checked = false;
                }
                return v;
            })
        }
        this.setData({
            wantjob: wantjobList,
            msg: "id:" + id
        })
    },

    // 完善信息 - 选择性别
    handleSelectGender(e) {
        let that = this;
        let index = e.currentTarget.dataset.index1;

        that.setData({
            gender: index
        })
    },

    // 完善信息- 选择薪资
    handleSelectSalary(e) {
        let that = this;
        let index = e.currentTarget.dataset.index3;
        console.debug(`性别设置为 [${index}]: ${Constant.salaryList[index].value}`);
        that.setData({
            salary: index
        })
    },
  // 完善信息 - 提交
  submitRecruiteeInfo: async function () {
    let recruiteeInfo = this._getRecruiteeInfo();
    let openid = wx.getStorageSync('openid');
    Loading.begin();

    try {
        let updateData = {
            id: openid,
            gender: this.data.gender,
            expectSalaryMin: Constant.salaryList[this.data.salary].min,
            expectSalaryMax: Constant.salaryList[this.data.salary].max,
        }
        await userCandidateService.updateByEntity(updateData);
        let wantjobList=[];
        this.data.wantjob.forEach(v => {
            if (v.checked == true) {
                wantjobList.push({
                    candidateOpenid: openid,
                    categoryUuid: v.id,
                    categoryName: v.job
                });
            }
        });

        await candidateForCategoryService.insertByEntityList(openid,wantjobList)

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

  

    // 角色选择时，用户点击选择求职者
    _handleRecruiteeSelected: async function () {
        try {
            Loading.begin();
            // 获取bc_user_wx 表信息
            let openid = wx.getStorageSync('openid');
            let userCandidate = await userCandidateService.loadEntityById(openid);
            console.log(userCandidate)
            if (string_util.isEmpty(userCandidate.data.identityCard)) {
                // 还未实名认证   
                this.setData({
                    juesehide: true, // 角色选择隐藏
                    smhide: false,   // 进入实名认证
                    ident: 'user',
                    openid: app.getOpenid(),
                });
            } else {
                // 已经实名认证 
                this.setData({
                    juesehide: true,
                    smhide: true,
                    ident: 'user',
                    openid: app.getOpenid(),
                });
            }
            // 保存登录角色信息
            UserService.saveUserRole(Constant.UserRole.Recruitee);
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
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!');
        console.log(this.data.mapLocation)

        console.debug('加载首页工作列表');
        let pageConfig = this._getPageConfig();

        console.log(pageConfig);

        let location = this.data.mapLocation == undefined? this._getLocation():this.data.mapLocation;
        let pagingParam = pageConfig.buildNextParam({
            longitude: location.longitude,
            latitude: location.latitude,
        });
        // 重置  maplocation
        this.setData({
            mapLocation: undefined,
        })

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
            jobUuid: jobInfo.jobId,
            jobname: jobInfo.jobName,
            jobmoney: new Constant.Salary(
                jobInfo.jobSalaryMin,
                jobInfo.jobSalaryMax,
            ).value,
            companyname: jobInfo.companyName,
            companytx: jobInfo.portraitPath,
    
            jl: (jobInfo.distance/1000).toFixed(1),
            phonenum: jobInfo.telephone,
        }));

        // 刷新页面
        this.setData({
            jobInfoList: current.concat(
                newList,
            ),
        });
    },

    _resetJobInfoList() {
        this.setData({
            jobInfoList: [],
        });
    }
});

module.exports = {
    createRecruiteeMethods: createRecruiteeMethods,
    createRecruiteeInfo: createRecruiteeData,
};

