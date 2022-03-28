// pages/jlxg/jlxg.js

const { UserService, user } = require('../../service/user_service');
const { Api } = require('../../common/api');
const { GlobalKey } = require('../../service/global_service');

const Constant = require('../../common/constant');
const StringUtil = require('../../utils/string_util');
const $ = require('../../utils/request_util');
const Loading = require('../../utils/loading_util');

const app = getApp();

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		tximg: '',
		_portraitPath: null,
		zsname: '',
		array: Constant.genderList,
		index: 0,
		phonenum: '',
		borthday: '1990',
		worktime: '1-3',
	},

	// 性别选择
	bindPickerChange: function (e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			index: e.detail.value
		})
	},

	handleInputRealName: function (e) {
		this.setData({
			zsname: e.detail.value,
		});
	},

	handleInputPhoneNumber: function (e) {
		this.setData({
			phonenum: e.detail.value,
		});
	},

	//点击修改头像
	xgtx() {
		let $this = this;
		wx.chooseMedia({
			count: 1,
			mediaType: ['image'],
			sourceType: ['album', 'camera'],
			camera: ['back', 'front'],

		}).then((res) => {

			if (res.tempFiles.length) {
				let url = Api.contact('/user-candidate/uploadPortrait');
				let path = res.tempFiles[0].tempFilePath;
				Loading.begin();

				wx.uploadFile({
					filePath: path,
					url: url,
					name: 'file',
					success: (r) => {

						let data = JSON.parse(r.data);
						let imageUrl = StringUtil.getSROD(
							data.data, $this.data.tximg,
						);
						console.debug(`imgurl: ${imageUrl}`);

						$this.setData({
							_portraitPath: data.data,
							tximg: imageUrl,
						});
					},
					fail: (e) => {
						console.log(e);
					},
					complete: () => {
						Loading.end();
					}
				});
			}
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this._init();
	},


	_init: async function () {
		await app.getOpenidReady();

		let [
			userInfo, recruiteeInfo
		] = await Promise.all([
			UserService.loadUserInfo(),
			UserService.loadRcruiteeInfo(),
		]);

		this.setData({
			_portraitPath: recruiteeInfo._portraitPath,
			tximg: StringUtil.getSROD(
				recruiteeInfo.portraitPath,
				userInfo.avatarurl,
			),
			zsname: recruiteeInfo.realName,
			index: recruiteeInfo.gender,
			phonenum: recruiteeInfo.telephone,
		});
	},

	saveResume: async function () {
		let data = this.data;
		try {
			Loading.begin();

			await $.request({
				url: Api.userCandidateModify,
				data: {
					id: app.getOpenid(),
					portraitPath: data._portraitPath,
					realName: data.zsname,
					gender: data.index,
					telephone: data.phonenum,
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
	}
})