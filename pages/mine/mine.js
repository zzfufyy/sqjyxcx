// pages/mine/mine.js


const { GlobalKey } = require("../../service/global_service");
const { UserService } = require("../../service/user_service");
const { Completer } = require("../../utils/function_util");

const Constant = require('../../common/constant');
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
	},


	// 改变身份
	switchUserRole: async function () {
		let isRecruitee = this.data.isRecruitee;
		let currentRole = (isRecruitee ?
			Constant.UserRole.Recruitee : Constant.UserRole.Recruiter
		);
		let targetRole = (isRecruitee ?
			Constant.UserRole.Recruiter : Constant.UserRole.Recruitee
		);

		let current = Constant.userRoleName[currentRole];
		let target = Constant.userRoleName[targetRole];

		let completer = new Completer();
		wx.showModal({
			title: '提示',
			content: '您当前是' + current + '身份，点击[确认]可切换至' + target + '身份',
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
				console.debug("加载应聘者信息");
				await this.loadRecruiteeInfo();


			} else {
				await this.loadRecruiterInfo();
			}

			this.setData({
				isRecruitee: !isRecruitee,
				nowsf: target,
			});
		}
	},

	onLoad: function (params) {
		console.debug('\n个人中心页面加载=========');
		app.getGlobal(GlobalKey.UserInfoChanged).addListener(this._listenInfoChange);
		this._reloadData();
	},

	onUnload: function (params) {
		console.debug('\n个人中心页面销毁=========');
		app.getGlobal(GlobalKey.UserInfoChanged).removeListner(this._listenInfoChange);
	},

	_listenInfoChange() {
		console.debug('个人中心监听用户信息改变');
		this._reloadData();
	},

	_reloadData: async function () {
		console.info('个人中心重载数据');

		await app.getOpenidReady();
		await this._loadUserRole();
		await this._loadUserInfo();
	},

	_loadUserRole: async function () {
		let isRecruitee = null;
		try {
			let role = await UserService.loadUserRole();
			console.log(`role: ${role}`);

			switch (role) {
				// 应聘人
				case Constant.UserRole.Recruitee:
					isRecruitee = true;
					break;
				case Constant.UserRole.Recruiter:
					isRecruitee = false;
					break;
				// TODO: 实现社区工作人员

				case Constant.UserRole.CommunityPersonel:
				default:
					console.error("未实现社区人员")
					break;
			}

		} catch (e) {
			// TODO: 没有检测到登录的用户角色，跳转首页要求用户选择
			console.error(e);
			isRecruitee = true;
		}

		if (isRecruitee != null) {

			let currentRole = isRecruitee ?
				Constant.UserRole.Recruitee : Constant.UserRole.Recruiter;

			this.setData({
				isRecruitee: isRecruitee,
				nowsf: Constant.userRoleName[currentRole],
			})
		}
	},

	_loadUserInfo: async function () {
		console.log(wx.getStorageSync('openid'));
		// 是求职者，加载求职者信息
		if (this.data.isRecruitee) {
			this.loadRecruiteeInfo();
		}
		// 招聘人员
		else {
			this.loadRecruiterInfo();
		}
	},

	_clearUserRole() {
		return UserService.clearUserRole();
	},

	...recruiter.createRecruiterMethods(),
	...recruitee.createRecruiteeMethods(),
})