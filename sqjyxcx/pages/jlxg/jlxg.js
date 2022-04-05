// pages/jlxg/jlxg.js

const { UserService, user } = require('../../service/user_service');
const { Api } = require('../../common/api');
const { GlobalKey } = require('../../service/global_service');

const Constant = require('../../common/constant');
const string_util = require('../../utils/string_util');
const url_util = require('../../utils/url_util');
const $ = require('../../utils/request_util');
const Loading = require('../../utils/loading_util');

const app = getApp();

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		tximg: '',
		portraitPath: null,
		zsname: '',
		array: Constant.genderList,
		index: 0,
		phonenum: '',
		worktime: '1-3',
		date: '1990',
		gznx: "",
	},
	// 出生年月啊
	bindDateChange: function (e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			date: e.detail.value
		})
	},
	// 性别选择
	bindPickerChange: function (e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			index: e.detail.value
		})
	},
	setPhone(openid, phone) {
		var that = this;
		wx.request({
			url: app.globalData.web_path + '/gywm/setWxuserPhone',
			data: {
				openid: openid,
				phone: phone,
			},
			header: app.globalData.header,
			success: function (res) {
				console.log(res)
				that._init();
				// that.openAlert(scene);
			},
			fail: function (res) {
			}
		})
	},
	getPhoneNumber(e) {
		let that = this
		var sessionKey = wx.getStorageSync('sessionKey')
		var openid = wx.getStorageSync('openid')
		console.log(openid)
		console.log(e)
		console.log(sessionKey)
		wx.request({
			url: app.globalData.web_path + '/wx/user/' + app.globalData.appId + '/phoneNumberInfo',
			data: {
				sessionKey: sessionKey,
				iv: e.detail.iv,
				encryptedData: e.detail.encryptedData,
			},
			header: app.globalData.header,
			success: function (res) {
				console.log(res.data.data.phoneNumber)
				that.setData({
					sqrphone: res.data.data.phoneNumber
				})
				that.setPhone(openid, res.data.data.phoneNumber);
				wx.setStorageSync('phone', res.data.data.phoneNumber)
			},
			fail: function (res) {
			}
		})
	},
	handleInputRealName: function (e) {
		this.setData({
			zsname: e.detail.value,
		});
	},
	gznx: function (e) {
		this.setData({
			gznx: e.detail.value,
		});
	},
	handleInputPhoneNumber: function (e) {
		this.setData({
			phonenum: e.detail.value,
		});
	},

	//点击修改头像
	bindtapChangePortrait() {
		let that = this;
		wx.chooseMedia({
			count: 1,
			mediaType: ['image'],
			sourceType: ['album', 'camera'],
			camera: ['back', 'front'],
			success(res) {
				that.setData({
					portraitPath: res.tempFiles[0].tempFilePath,
					tximg:  res.tempFiles[0].tempFilePath,
					none: 0
				})
			}
		})

		console.log(this.data)
	},
	saveResume: async function () {
		let that = this;
		let data = this.data;
		await app.getOpenidReady();
		let openid = wx.getStorageSync('openid');
		try {
			Loading.begin();
			// 上传图片
			// 如果图片路径不包含 web_path 或者为空 则不执行上传
			let flagUpload = true;
			if (string_util.isEmpty(that.data.portraitPath) || that.data.portraitPath.includes(app.globalData.web_path)) {
				flagUpload = false;
			}
			if (flagUpload) {
				let uploadPromise = $.upload({
					url: '/user-candidate/uploadPortrait?id=' + openid,
					filePath: that.data.portraitPath,
					formData: {},
					name: 'file',
					header: app.globalData.header,
				});
				await uploadPromise
					.then((r) => { console.log(r) })
					.catch((r) => console.error(r));
			}

			// 修改图片
			await $.request({
				url: Api.userCandidateModify,
				data: {
					id: app.getOpenid(),
					realName: data.zsname,
					gender: data.index,
					telephone: data.phonenum,
					birthday: data.date,
					ext1: data.gznx
				},
				method: $.RequestMethod.POST,
				header: $.jsonHeader,
			});

			app.getGlobal(GlobalKey.UserInfoChanged).notifyListeners();
			wx.navigateBack({
				delta: 0,
			});
		} finally {
			Loading.end();
		}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		Loading.begin();
		await app.getOpenidReady();
		let [
			userInfo, recruiteeInfo
		] = await Promise.all([
			UserService.loadUserInfo(),
			UserService.loadRcruiteeInfo(),
		]);
		let csny = app.formatDate(recruiteeInfo.birthday, "yyyy-MM-dd")
		this.setData({
			portraitPath: recruiteeInfo.portraitPath,
			tximg: url_util.isImageUrlInServer(recruiteeInfo.portraitPath) ?
				app.globalData.web_path + recruiteeInfo.portraitPath : recruiteeInfo.portraitPath,
			zsname: recruiteeInfo.realName,
			index: recruiteeInfo.gender,
			phonenum: recruiteeInfo.telephone,
			date: csny,
			gznx: recruiteeInfo.ext1
		});
		Loading.end();
	},


})