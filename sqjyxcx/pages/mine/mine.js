// pages/mine/mine.js


const { GlobalKey } = require("../../service/global_service");
const { UserService } = require("../../service/user_service");
const { Completer } = require("../../utils/function_util");

const CONSTANT = require('../../common/constant');
const recruitee = require('./recruitee');
const recruiter = require('./recruiter');

const app = getApp();

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		personinfo: [{
			tximg: '',
			name: '',
			sex: '',
			year: '23',
			cellphone: ' ',
			jobname: '保洁人员',
			money: '',
			msgw: '34',
			ytdgw: '127',
			byll: '',
		}],
		ytdgw: "",
		byll: '',
		zw: "",
		companyinfo: [{
			tximg: '/img/tx.png',
			name: '张三',
			// sex:'女',
			// year:'23',
			companyname: '长沙竟网信息科技有限公司',
			jobname: '保洁人员',
			money: '3000-5000',
			msgw: '34',
			ytdgw: '127',
			byll: '55',
		}],

		// 默认身份为求职方
		// TODO: 使用加载条
		isRecruitee: true,
		// 默认求职者
		identity: CONSTANT.UserRole.Recruitee,
	},
	_clearUserRole() {
		return UserService.clearUserRole();
	},

	// 改变身份
	switchUserRole: async function () {
		let isRecruitee = this.data.isRecruitee;
		let currentRole = (isRecruitee ?
			CONSTANT.UserRole.Recruitee : CONSTANT.UserRole.Recruiter
		);
		let targetRole = (isRecruitee ?
			CONSTANT.UserRole.Recruiter : CONSTANT.UserRole.Recruitee
		);

		let currentUserRoleName = CONSTANT.userRoleName[currentRole];
		let targetUserRoleName = CONSTANT.userRoleName[targetRole];

		let completer = new Completer();
		wx.showModal({
			title: '提示',
			content: '您当前是' + currentUserRoleName + '身份，点击[确认]可切换至' + targetUserRoleName + '身份',
			success(res) {
				if (res.confirm) {
					completer.resolve(true);
				} else if (res.cancel) {
					completer.resolve(false);
				}
			}
		});

		let shouldSwtich = await completer.promise;

		if (shouldSwtich) {
			if (!isRecruitee) {
				
				// 全局设置用户变量
				await this.loadRecruiteeInfo();
				wx.setStorageSync('globalIdent', 'user');


			} else {
				await this.loadRecruiterInfo();
				wx.setStorageSync('globalIdent', 'company');
			}

			this.setData({
				isRecruitee: !isRecruitee,
				nowsf: targetUserRoleName,
			});
		}
	},

	onLoad: async function (params) {
		
	},

	onShow: async function(){
		console.log('个人中心页面加载');
		let that = this;
		await app.getOpenidReady();
		// 加载全局 角色
		let role = await UserService.loadUserRole();
		if (role == CONSTANT.UserRole.Recruitee) {
			this.setData({
				isRecruitee: true,
				nowsf: CONSTANT.userRoleName[role],
			})
		} else if (role == CONSTANT.UserRole.Recruiter) {
			this.setData({
				isRecruitee: false,
				nowsf: CONSTANT.userRoleName[role],
			})
		}
		// 根据角色加载数据
		if (this.data.isRecruitee) {
			this.loadRecruiteeInfo();
		} else {
			this.loadRecruiterInfo();
		}
		// var recruiteeInfo =  UserService.loadRcruiteeInfo();
		console.log(that.data.zw)
	},

	onUnload: function (params) {
	},



	...recruiter.createRecruiterMethods(),
	...recruitee.createRecruiteeMethods(),
})