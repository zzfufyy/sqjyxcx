// index.js
const { GlobalKey } = require('../../service/global_service');

// 求职者模块
const recruitee = require('./recruitee');
// 招聘者模块
const recruiter = require('./recruiter');
// 启动引导模块（引导用户授权、选择角色、注册角色等）
const bootstrap = require('./bootstrap');
// 内容加载模块
const content = require('./content');
const Loading = require('../../utils/loading_util');
const string_util = require('../../utils/string_util');

const userCandidateService = require('../../common/userCandidateService');
const jobCategoryService = require('../../common/jobCategoryService');
const recruitJobService = require('../../common/recruitJobService');
const viewRecordService = require('../../common/viewRecordService');

// 获取应用实例
const app = getApp();

// 日志首名
const PAGENAME = 'index.js - ';
Page({
	data: {
		...recruitee.createRecruiteeInfo(),
		topnav: [
			{ name: '投递记录', imsrc: '/img/tdjl.png', url: '' },
			{ name: '个人简历', imsrc: '/img/grjl.png', url: '' },
			{ name: '邀约面试', imsrc: '/img/yyms.png', url: '' },
			{ name: '修改定位', imsrc: '/img/xgdw.png', url: '' },
		],
		//判断用户是求职者还是企业  user/company
		ident: 'user',

		animated: false,
		compangjob: [
			// {
			//   jobname: '服务员/保洁', usertag: [{ tagbq: '女' }, { tagbq: '29岁' }, { tagbq: '3000-5000/月' }],
			//   name: '张三', tximg: '/img/tx.png', hxtime: '10分钟前', sqname: '天源社区', companyjuli: '1.2',
			// },
			// {
			//   jobname: '服务员/保洁', usertag: [{ tagbq: '女' }, { tagbq: '29岁' }, { tagbq: '3000-5000/月' }],
			//   name: '李四', tximg: '/img/tx.png', hxtime: '10分钟前', sqname: '天源社区', companyjuli: '1.2',
			// },
			// {
			//   jobname: '服务员/保洁', usertag: [{ tagbq: '女' }, { tagbq: '29岁' }, { tagbq: '3000-5000/月' }],
			//   name: '王二', tximg: '/img/tx.png', hxtime: '10分钟前', sqname: '天源社区', companyjuli: '1.2',
			// },

		],
		scene: "",
		nianl: [
			{ nal: '30-40岁' }, { nal: '40-50岁' }, { nal: '50-60岁' },
		],
		num2: '',

		xzyq: [
			{ xz: '3K-5K' }, { xz: '5K-8K' }, { xz: '8K-10K' },
		],
		ht: '',

		// 用户授权
		isUserAuthorized: false, // 用户是否授权
		// 授权框隐藏
		hideUserInfoAuth: true,
		// 角色选择
		juesehide: true,
		// 实名认证
		smhide: true,
		// 求职者完善信息
		infows: true,

		companyUuid: '',
		//企业登录
		qydl: true,
		//提示用户需要获取手机号
		sjh: true,

		isShow: false,
		arrshow: true,

		// joblist: [
		//   { jobname: '清洁工', jobmoney: '3000-3800', companyname: '文和友餐饮有限公司', companytx: '/img/tx.png', jl: '1.5', phonenum: '13112345678' },
		//   { jobname: '清洁工', jobmoney: '3000-3800', companyname: '文和友餐饮有限公司', companytx: '/img/tx.png', jl: '1.5', phonenum: '13112345678' },
		//   { jobname: '清洁工', jobmoney: '3000-3800', companyname: '文和友餐饮有限公司', companytx: '/img/tx.png', jl: '1.5', phonenum: '13112345678' },
		// ],
	},

	state: {

	},
	//社区服务
	sqfw() {
		wx.showToast({
			title: '暂未开放',
		})
		// wx.navigateTo({
		// 	url: '/pages/sqfw/sqfw',
		// })
	},
	//打电话
	callphone(e) {
		console.log(e)
		
		let phonenum = e.currentTarget.dataset.phonenum;
		if (string_util.isEmpty(phonenum)) {
			wx.showToast({
				title: '公司暂未留电话\n可先发送简历',
			})
			return;
		}
		wx.makePhoneCall({
			phoneNumber: phonenum //仅为示例，并非真实的电话号码
		})
	},
	// 点击跳转到岗位详情
	async bindtapCandidateJobInfo(e) {
		let recruitJobUuid = this.data.jobInfoList[e.currentTarget.dataset.index].jobUuid;
		// 增加浏览量 再跳转
		try {
			Loading.begin();
			await recruitJobService.increaseViewCount(recruitJobUuid);
		} catch (e) {
			console.error(e)
		} finally {
			Loading.end();
		}
		wx.navigateTo({
			url: '/pages/zwxq/zwxq?recruitJobUuid=' + recruitJobUuid,
		})
	},
	// 点击跳转到求职者详情
	async bindtapRecruiterJobInfo(e) {
		let candidateOpenid = this.data.compangjob[e.currentTarget.dataset.index].candidateOpenid;
		try {
			Loading.begin();
			// 增加浏览量
			await userCandidateService.increaseCountView(candidateOpenid);
			// 构建ViewRecord
			let viewRecord = {
				candidateOpenid: candidateOpenid,
				recruiterOpenid: '',
				companyUuid: this.data.companyUuid,
			}
			await viewRecordService.insertByEntity(viewRecord);
		} catch (e) {
			console.error(e);
		} finally {
			Loading.end();;
		}
		// 跳转到求职详情
		wx.navigateTo({
			url: '/pages/loojl/lookjl?candidateOpenid=' + candidateOpenid,
		})
	},
	//求职者搜索函数
	searchjob() {
		wx.navigateTo({
			url: '/pages/searchpage/searchpage',
		})
	},
	//企业搜索函数
	searchjob1() {
		wx.navigateTo({
			url: '/pages/qysearch/qysearch',
		})
	},
	//添加意向
	btnExpectJob() {
		wx.navigateTo({
			url: '/pages/wantjob/wantjob',
		})
	},
	//＋发布招聘
	btnPostJob() {
		wx.navigateTo({
			url: '/pages/fbjob/fbjob',
		})
	},

	// 选择求职者
	qzz: async function () {
		wx.setStorageSync('globalIdent', 'user');
		this.setData({
			ident: 'user',
		})
		await this._handleRecruiteeSelected();
		// 重新加载内容
		await this.reloadContent();


	},

	//招聘方
	zpf: async function () {
		this.setData({
			ident: 'company',
		})
		wx.setStorageSync('globalIdent', 'company');
		await this._handleRecruiterSelected();
		// 重新加载内容
		this.reloadContent();


	},



	//完善信息
	wsxnhide() {
		let infows = this.data.infows
		this.setData({
			infows: true
		})
	},
	//提示用户需要获取手机号*确认*
	getPhoneNumber(e) {
		this.setData({
			sjh: true,
			juesehide: false
		})
	},
	//提示用户需要获取手机号*忽略*
	hulue() {
		this.setData({
			hideUserInfoAuth: true,
			// juesehide:false
		})
	},

	//实名认证跳过
	passbtn() {
		this.setData({
			smhide: true,
			// juesehide:false
		})
	},
	//求职者完善信息跳过
	passbtnwsxx() {
		this.setData({
			infows: true,
			// juesehide:false
		})
	},

	setPhone(openid, phone) {
		wx.request({
			url: app.globalData.web_path + '/gywm/setWxuserPhone',
			data: {
				openid: openid,
				phone: phone,
			},
			header: app.globalData.header,
			success: function (res) {
				console.log(res)
				// that.openAlert(scene);
			},
			fail: function (res) {
			}
		})
	},


	// 年龄选择
	nlxz(e) {
		let that = this;
		let index = e.currentTarget.dataset.index2;
		that.setData({
			num2: index
		})
	},


	// 求职者完善信息end
	//企业登录
	qydltijsq() {
		let qydl = this.data.qydl
		this.setData({
			qydl: true
		})
	},


	async onLoad(options) {
		console.log('index onLoad');
		let that = this
		//自定义头部方法
		this.setData({
			navH: app.globalData.navHeight,
			margtop: app.globalData.navHeight
		});
		this.data.wantjob[0].checked = true;
		this.setData({
			wantjob: this.data.wantjob,
		})
		//设置scroll-view的高度
		console.log(app.globalData.arrij.screenHeight)

		that.setData({
			ht: app.globalData.arrij.screenHeight - 119
		})
		// 加载完善信息 的工作选择列表
		let jobCategoryListResult = await jobCategoryService.loadList();
		console.log(jobCategoryListResult)
		let wantjobList = jobCategoryListResult.data.map(r => {
			return {
				job: r.categoryName,
				id: r.id,
				checked: false,
			};
		})
		wantjobList.splice(4, wantjobList.length - 5);
		this.setData({
			wantjob: wantjobList,
		})
	},

	async onShow() {
		console.log('index onshow');
		// 全局
		this.setData({
			ident: wx.getStorageSync('globalIdent'),
		});
		console.log(this.data.ident);
		await app.getOpenidReady();

		// 如果全局已经初始化 则不再初始化
		if (!wx.getStorageSync('completeBoostrap')) {
			console.log('index bootstrap');
			await this.bootstrap();
			wx.setStorageSync('completeBoostrap', true);
		}
		this.reloadContent();
	},

	onReachBottom: async function () {
		this.loadContent();
	},


	...bootstrap.createBootstrapMethod(),
	...recruitee.createRecruiteeMethods(),
	...recruiter.createRecruiterMethods(),
	...content.createContentMethods(),
})
