// 如果小程序是采用组件化的方式开发的话，那可以将这一部分迁移到子组件的逻辑中

const Paging = require('../../utils/paging_util');
const Constant = require('../../common/constant');
const userCandidateService = require('../../common/userCandidateService');
const recruitCompanyService = require('../../common/recruitCompanyService');
const userIdent = 'user';
const companyIdent = 'company';

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
    changeLocation(e) {
        let that = this
        // 判断是否是 

        wx.chooseLocation({
            type: 'gcj02',
            async success(res) {
                console.log('用户选择定位：');
                console.log(res);
                console.log(that.data);
                if (that.data.ident == 'user') {
                    let updateData = {
                        id: that.data.openid,
                        lon: res.longitude,
                        lat: res.latitude,
                        address: res.address + res.name,
            
                    }
                    let updateCandidatePromise = userCandidateService.updateByEntity(updateData);
                    updateCandidatePromise.then(r=>{
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
                    updateCompanyPromise.then(r=>{
                        console.log(r);
                    }).catch(r =>{
                        console.error(r);
                    })

                }

                that.setData({
                    location: res,
                });

                that._resetContent();
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
        console.log('首页加载列表数据');

        this.state.pageConfig.setNoMoreDataCallback(this._noMoreData);

        let data = this.data;
        console.error(this.data)
        console.log(this.data.ident);
        // await this._loadCandidateList();
        // 当前用户角色是求职者
        if (data.ident === userIdent) {
            // 调用 recruitee 模块中的加载数据的函数
            await this._loadJobList();
        }
        // 当前用户是招聘者
        else if (data.ident == companyIdent) {
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

    _resetContent() {
        this.state.pageConfig.reset();
        // 重置工作列表哦
        this._resetJobList();
        // 重新加载内容
        this.loadContent();
    },

    _getLocation() {
        return this.data.location ?? Constant.defaultLocation;
    }
});


module.exports = {
    createContentMethods: createContentMethods,
}