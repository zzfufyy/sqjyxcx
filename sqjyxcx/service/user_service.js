const { Api } = require('../common/api');
const { GlobalKey } = require('../service/global_service');

const $ = require('../utils/request_util');
const Constant = require('../common/constant');

const app = getApp();

const _userRoleStorageKey = 'USER_ROLE';

const UserService = {
    /**
     * 加载用户的基本信息
     */
    loadUserInfo: function () {
        return $.requestOnlyData({
            url: Api.userInfo,
            data: {
                openid: app.getOpenid(),
            },
        });
    },

    /**
     * 加载用户作为求职者的信息
     */
    loadRcruiteeInfo: function () {
        return $.requestOnlyData({
            url: Api.userCandidateInfo,
            data: {
                openid: app.getOpenid(),
            },
        });
    },
    saveRecruiteeInfo: function (data) {
        return $.requestOnlyData({
            url: Api.userCandidateModify,
            data: {
                ...data,
                id: app.getOpenid(),
            },
            method: $.RequestMethod.POST,
            header: $.jsonHeader,
        })
    },

    loadRecruiterInfo: function () {
        return $.requestOnlyData({
            url: Api.userRecruiterInfo,
            data: {
                id: app.getOpenid(),
            }
        });
    },

    loadUserRoleInfo: async function (userRole) {
        let res = null;
        // 是求职者
        if (userRole === Constant.UserRole.Recruitee) {
            res = await this.loadRcruiteeInfo();
        }
        // 是招聘者
        else {
            res = await this.loadRecruiterInfo();
        }

        return res;
    },

    // 如果本地缓存无效的话，可以换成从服务端获取
    saveUserRole: function (userRole, notify) {
        console.debug(`本地存储用户角色: ${userRole}[${Constant.userRoleName[userRole]}]`);
        wx.setStorage({
            key: _userRoleStorageKey,
            data: userRole,
        });
        if (notify) {
            app.setGlobal(
                GlobalKey.IndexBootstrap,
                true,
            );
        }
    },

    // 返回了一个 Promise，方便未来（可能）从本地存储到服务端存储的迁移
    // 虽然本地存储有同步的接口，但是这里使用异步。便于从服务端异步加载数据的迁移
    loadUserRole: function () {
        return new Promise(
            (resolve, reject) => {
                wx.getStorage({
                    key: _userRoleStorageKey,
                    success: (r) => {
                        let v = r.data;
                        console.debug(`本地存储的用户角色为: ${v}[${Constant.userRoleName[v]}]`);
                        resolve(v);
                    },
                    fail: reject,
                });
            }
        )
    },

    clearUserRole: async function () {
        return new Promise(
            (resolve, reject) => {
                wx.removeStorage({
                    key: _userRoleStorageKey,
                    success: resolve,
                    fail: reject,
                });
            }
        );
    }
};

module.exports = {
    UserService: UserService,
}

