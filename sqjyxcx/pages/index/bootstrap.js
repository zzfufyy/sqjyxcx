/// 首页初始化流程

const { Completer } = require("../../utils/function_util.js");
const { UserService } = require('../../service/user_service');

// 常量
const Constant = require('../../common/constant');
const Loading = require('../../utils/loading_util');
const string_util = require('../../utils/string_util');

const userCandidateService = require('../../common/userCandidateService');
const userRecruiterService = require('../../common/userRecruiterService');


const app = getApp();
// bootstrap 对象加载
const createBootstrapMethod = () => ({

    state: {
        // 授权流程完成器，检测授权流程是否完成
        authCompl: null,

    },

    /* 引导用户授权 hidden位：hideUserInfoAuth */
    _doAuthorize: function (scene) {
        let authCompl = new Completer();
        this.state.authCompl = authCompl;

        var that = this;

        wx.login({
            success: function (res) {
                wx.request({
                    url: app.globalData.web_path + '/wx/user/' + app.globalData.appId + '/login',
                    data: {
                        code: res.code,
                        loginType: 'openid'
                    },
                    header: app.globalData.header,
                    success: function (e) {
                        // 用户还没有授权数据
                        if (JSON.stringify(e.data.data.userWx) == undefined) {
                            that.setData({
                                hideUserInfoAuth: false,
                                scene: scene,
                                animated: true
                            });
                            // auth 等待用户授权之后完成
                        }
                        // 用户已授权
                        else {
                            that.setData({
                                hideUserInfoAuth: true,
                                scene: scene,
                                animated: false,
                            });

                            // 自动登录，无需授权，因此直接完成
                            authCompl.resolve();
                        }
                    }
                })
            }
        });

        return authCompl.promise;
    },

    /* 保存用户信息到后台 */
    _saveUserInfo: async function (userInfo, iv, signature, encryptedData, rawData, scene) {
        const that = this;
        console.log(userInfo)
        console.log(iv)
        console.log(signature)
        console.log(encryptedData)
        console.log(rawData)
        console.log(app.globalData.web_path)
        console.log(app.globalData.appId)
        // wx.showLoading({
        //   title: '加载中',
        //   mask: true
        // })

        wx.login({
            success: function (res) {
                console.log(res)
                //如果有状态码就向后台发送请求
                if (res.code) {
                    wx.request({
                        url: app.globalData.web_path + '/wx/user/' + app.globalData.appId + '/login',
                        data: {
                            code: res.code,
                            loginType: 'openid'
                        },
                        header: app.globalData.header,
                        success: async function (res) {
                            console.log(res);
                            // wx.setStorageSync('openid', res.data.data.openid);
                            wx.setStorageSync('sessionKey', res.data.data.sessionKey);
                            // wx.setStorageSync('Token', res.data.data.Token);
                            var name = wx.getStorageSync('user').nickname;
                            if (name) {
                                that.setData({
                                    nickName: name
                                })
                            }

                            //判断是否存在token,不存在则说明该用户没有注册,需要弹出用户登录页面,有则不需要进行页面跳转
                            if (!res.data.data.Token && userInfo) {
                                //保存用户信息 到bc_user
                                var openid = wx.getStorageSync('openid');
                                console.log(openid);
                                wx.request({
                                    url: app.globalData.web_path + '/wx/user/' + app.globalData.appId + '/info',
                                    data: {
                                        sessionKey: res.data.data.sessionKey,
                                        iv: iv,
                                        signature: signature,
                                        encryptedData: encryptedData,
                                        rawData: rawData,
                                        openid: openid
                                    },

                                    header: app.globalData.header,
                                    success: function (res) {
                                        wx.setStorageSync('user', res.data.data);
                                        wx.hideLoading();
                                        var phone = wx.getStorageSync('phone')
                                        that.setPhone(openid, phone);
                                    },
                                    fail: function (res) {
                                        console.log(111)
                                    }
                                })

                                // 求职者用户初始化
                                let insertCandidateData = {
                                    id: openid,
                                    realName: userInfo.nickName,
                                    gender: userInfo.gender,
                                    portraitPath: userInfo.avatarUrl,
                                }
                                await userCandidateService.insertByEntity(insertCandidateData);
                                // 招聘人用户初始化
                                let insertRecruiterData = {
                                    id: openid,
                                    realName: userInfo.nickName,
                                    portraitPath: userInfo.avatarUrl,
                                }
                                await userRecruiterService.insertByEntity(insertRecruiterData);
                            } else {
                                //放在请求头里
                                app.globalData.header.Token = res.data.data.Token
                                wx.hideLoading();
                            }
                        },
                        error: function (res) {
                            console.log("请求失败");
                        }
                    });
                }
            },
            fail: function (res) {
                console.log("error", "接口调用失败!");
            },
        })

        // that.userShzt(); // 用户审核状态
    },

    //获取微信用户信息
    bindtapGetUserProfile(e) {
        const scene = this.data.scene;
        var that = this;

        console.log(app.globalData.web_path)
        console.log(app.globalData.appId)
        console.log(e)
        wx.getUserProfile({
            desc: "获取你的昵称、头像、地区及性别", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                console.log(res);
                this.setData({
                    userInfo: res.userInfo,
                })
                that._saveUserInfo(res.userInfo, res.iv, res.signature, res.encryptedData, res.rawData, scene);
                // 如果用户同意
                this.setData({
                    isUserAuthorized: true,
                    hideUserInfoAuth: true,
                });

            }, fail: (res) => {
                this.setData({
                    isUserAuthorized: false,
                    hideUserInfoAuth: true,
                });
                console.log(res);
                console.error("用户没有给予授权，需要授权后赋以操作功能");

            }, complete: () => {
                this.state.authCompl.resolve();
            }
        });
    },


    bootstrap: async function () {
        await this._doAuthorize();
        // await this._doSelectUserRole();
        // 弹出角色选择
        this.setData({
            juesehide: false,
        });
    },
});

module.exports = {
    createBootstrapMethod: createBootstrapMethod,
}