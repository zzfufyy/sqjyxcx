const { Salary } = require('../../common/constant');
const { UserService, user } = require('../../service/user_service');
const { GlobalKey } = require('../../service/global_service');

const Constant = require('../../common/constant');
const StringUtil = require('../../utils/string_util');
const loading = require('../../utils/loading_util');
const url_util = require('../../utils/url_util');
const string_util = require('../../utils/string_util');
const date_util = require('../../utils/date_util');

// 加载服务
const candidateForCategoryService = require('../../common/candidateForCategoryService');
const recruitRecordService = require('../../common/recruitRecordService');
const app = getApp();

const createRecruiteeMethods = () => ({
    loadRecruiteeInfo: async function () {
        let zw = "";
        loading.begin();
        let that = this
        try {
            let openid = wx.getStorageSync('openid')
            let recruiteeInfo = await UserService.loadRcruiteeInfo();
            let userInfo = await UserService.loadUserInfo();

            // 期望职位列表
            let expectCatagoryListResult = await candidateForCategoryService.loadListByCandidateOpenid(openid);
            console.log(expectCatagoryListResult);
            let zwListSum ='';
            expectCatagoryListResult.data.forEach((v,i)=>{
                if(i==0){
                    // TODO 问题float 超出隐藏了
                   zwListSum += (v.categoryName + '  ');// 可能显示不下  目前只写一个
                }
            })

            // 已投递岗位数量
            let countData = await recruitRecordService.countByCandidateOpenid(openid);
            let countDeliveredJob = countData.data;

            // 设置数据
            that.setData({
                zw: zwListSum,
                ytdgw: countDeliveredJob,
                byll:  recruiteeInfo.countView,
            });
            
            this.setData({
                // 暂时只有一个数据
                personinfo: [{
                    tximg: url_util.isImageUrlInServer(recruiteeInfo.portraitPath)?
                        app.globalData.web_path + recruiteeInfo.portraitPath: recruiteeInfo.portraitPath,
                    name: recruiteeInfo.realName, 
                    sex: Constant.genderList[recruiteeInfo.gender],
                    year: string_util.isEmpty(recruiteeInfo.birthday)?'':date_util.getAgeByBirthday(recruiteeInfo.birthday) + '岁',
                    cellphone: recruiteeInfo.telephone,
                    jobname: that.data.zw,
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