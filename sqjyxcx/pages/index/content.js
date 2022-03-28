// 如果小程序是采用组件化的方式开发的话，那可以将这一部分迁移到子组件的逻辑中

const Paging = require('../../utils/paging_util');

const userIdent = 'user';
const companyIdent = 'company';


const createContentMethods = () => ({
    // 分页状态
    state: {
        pageConfig: new Paging.PageConfig(5),
    },


    // 根据用户角色加载列表信息
    loadContent: async function () {
        console.info('首页加载列表数据');

        this.state.pageConfig.setNoMoreDataCallback(this._noMoreData);

        let data = this.data;
        // 当前用户角色是求职者
        if (data.ident === userIdent) {
            // 调用 recruitee 模块中的加载数据的函数
            await this._loadJobList();
        }
        // 当前用户是招聘者
        else if (data.ident == companyIdent) {
            // 
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
    }
});


module.exports = {
    createContentMethods: createContentMethods,
}