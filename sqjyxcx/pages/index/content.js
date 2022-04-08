// 如果小程序是采用组件化的方式开发的话，那可以将这一部分迁移到子组件的逻辑中

const Paging = require('../../utils/paging_util');
const Constant = require('../../common/constant');
const userCandidateService = require('../../common/userCandidateService');
const recruitCompanyService = require('../../common/recruitCompanyService');
const { UserService } = require('../../service/user_service');
const userIdent = 'user';
const companyIdent = 'company';

let app = getApp();
const createContentData = () => ({
    positionInfo: positionInfo,
});

const createContentMethods = () => ({
    // 分页状态
    state: {
        pageConfig: new Paging.PageConfig(5),
        location: Constant.defaultLocation,
    },

    // 修改定位
    async changeLocation(e) {
        let that = this
        // 判断是否是 

        let pro = wx.chooseLocation({
            type: 'gcj02',
            async success(res) {
                console.log('用户选择定位：');
                console.log(res);
                console.log(that.data);
                that.setData({
                    mapLocation: {
                        longitude:res.longitude,
                        latitude: res.latitude,
                    },
                });
                if (that.data.ident == 'user') {
                    
                    let updateData = {
                        id: that.data.openid,
                        lon: res.longitude,
                        lat: res.latitude,
                        address: res.address + res.name,
            
                    }
                    let updateCandidatePromise = userCandidateService.updateByEntity(updateData);
                    await updateCandidatePromise.then(r=>{
                        console.log(r);
                    }).catch(r => {
                        console.error(r);
                    })
                }else if(that.data.ident == 'company'){
                    let updateData = {
                        id: that.data.companyUuid,
                        lon: res.longitude,
                        lat: res.latitude,
                        address : res.address + res.name,
                        addressDetail:'', // 清空详细地址（门牌号等）
                    }
                    let updateCompanyPromise = recruitCompanyService.updateRecruitCompany(updateData);
                    await updateCompanyPromise.then(r=>{
                        console.log(r);
                    }).catch(r =>{
                        console.error(r);
                    })

                }
                
               
            },
            fail: function (e) {
                console.log(e);
                that.setData({
                    location: defaultLocation,
                });
            }
        })
    },

    // 根据用户角色加载列表信息
    loadContent: async function () {
        // 加载位置参数
        this.state.pageConfig.setNoMoreDataCallback(this._noMoreData);
        let data = this.data;
        console.log(this.data.ident);
        if (this.data.ident === 'user') {
            // 加载位置参数
            let candidateInfo = await UserService.loadRcruiteeInfo();
            this.setData({
                location:{
                    longitude: candidateInfo.lon,
                    latitude: candidateInfo.lat,
                }
            })
            console.log('加载求职者方 展示的数据')
            await this._loadJobList();
        }
        // 当前用户是招聘者
        else if (data.ident === 'company') {
            let recruiterInfo = await UserService.loadRecruiterInfo();
            let companyData = await recruitCompanyService.loadEntityById(recruiterInfo.companyUuid);
            console.log(recruiterInfo.companyUuid);
            this.setData({
                companyUuid: companyData.data.id,
                location:{
                    longitude: companyData.data.lon,
                    latitude: companyData.data.lat,
                }
            })
            
            console.log('加载招聘人方 展示的数据');
            console.log(this.data);
            await this._loadCandidateList();
        }
    },

    // 没有更多页面了
    _noMoreData() {
        
        this.setData({
            noMoreData: true,
        });
    },

    _getPageConfig() {
        return this.state.pageConfig;
    },

    reloadContent() {
        this.state.pageConfig.reset();
        // 重置 展现岗位的列表
        this._resetJobInfoList();
        // 重置 展现求职者的列表
        this._resetCompangjob();
        // 重新加载内容
        this.loadContent();
    },
    _getLocation() {
        let a ;
        if(this.data.location==null||this.data.location=="undefined"){
            a=Constant.defaultLocation;
        }else{
            a= this.data.location;
        }
        return a
    }
    
});


module.exports = {
    createContentMethods: createContentMethods,
}