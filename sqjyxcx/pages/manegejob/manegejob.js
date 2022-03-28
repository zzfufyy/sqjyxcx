// pages/manegejob/manegejob.js
const $ = require('../../utils/request_util');
const string_util = require('../../utils/string_util');
const userRecruiterService = require('../../common/userRecruiterService');
const recruitCompanyService = require('../../common/recruitCompanyService');
const recruitJobService = require('../../common/recruitJobService');
const CONSTANT = require('../../common/constant');
const { Salary } = require('../../common/constant');

const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		companyUuid: '',

		currentId: '0',
		currentTab: '0',
		yhid: "",
		organid: "",
		section: [],
		joblistyfb: [
			// {
			// 	jobname: '店长',
			// 	money: '6000-7000',
			// 	needs: '1',
			// 	gwyq: '合理控制人事成本，保持员工工作的高效率；维持会所良好的顾客服务；加强防火、防盗、防工伤、安全保卫的工作；审核店内预算和支出；',
			// 	yl: '1234',
			// 	td: '234',
			// 	id: 'uuid'
			// },
		],
		joblistyxj:[]
	},
	//点击头部导航的点击事件
	handleTap: function (e) {
		let id = e.currentTarget.id;
		if (id) {
			this.setData({
				currentId: id,
				currentTab: id,
			})
		}
	},
	// 滚动切换标签样式 
	switchTab: function (e) {
		// console.log(e) 
		var that = this;
		that.setData({
			currentTab: e.detail.current,
			currentId: e.detail.current
		});
	},
	//编辑职位
	editjob(e) {
		console.log(e.currentTarget.dataset.id);
		wx.navigateTo({
			url: '/pages/editjob/editjob?id=' + e.currentTarget.dataset.id,
		})
	},
	//下架点击事件
	async xiajia(e) {
		let that = this
		console.log(e.currentTarget.dataset);
		let xiajiaid = e.currentTarget.dataset.id
		let joblistyfb = that.data.joblistyfb
		let joblistyxj = that.data.joblistyxj;

		console.log(e)
		for (let i = 0; i < joblistyfb.length; i++) {
			if (xiajiaid == joblistyfb[i].id) {
				wx.showModal({
					title: '提示',
					content: '是否确认下架',
					async success(res) {
						if (res.confirm) {
							let updateData ={
								id: xiajiaid,
								status: -1,
							}
							let updateStatusPromise = recruitJobService.updateByEntity(updateData);
							await updateStatusPromise
								.then(r => console.log(r))
								.catch(r => console.error(r));


							joblistyxj.push(joblistyfb[i])
							joblistyfb.splice(i, 1)
							let section1 = [{
								name: '已发布',
								typeId: '0',
								num: joblistyfb.length
							},
							{
								name: '已下架',
								typeId: '1',
								num: joblistyxj.length
							},
							]
							that.setData({
								joblistyfb: joblistyfb,
								joblistyxj: joblistyxj,
								section: section1
							})

						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})

			}
		}
		let section1 = [{
			name: '已发布',
			typeId: '0',
			num: joblistyfb.length
		},
		{
			name: '已下架',
			typeId: '1',
			num: joblistyxj.length
		},
		]
		that.setData({
			joblistyfb: joblistyfb,
			joblistyxj: joblistyxj,
			section: section1
		})
	},
	//上架点击事件
	async shangjia(e) {
		let that = this
		let sjiaid = e.currentTarget.dataset.id
		let joblistyfb = that.data.joblistyfb
		let joblistyxj = that.data.joblistyxj

		// 提交 该条目 status为  normal
		console.log(e)
		for (let i = 0; i < joblistyxj.length; i++) {
			if (sjiaid == joblistyxj[i].id) {
				wx.showModal({
					title: '提示',
					content: '是否确认上架',
					async success(res) {
						if (res.confirm) {
							let updateData ={
								id: sjiaid,
								status:0,
							}
							let updateStatusPromise = recruitJobService.updateByEntity(updateData);
							await updateStatusPromise
								.then(r => console.log(r))
								.catch(r => console.error(r));
							joblistyfb.push(joblistyxj[i])
							joblistyxj.splice(i, 1)
							let section1 = [{
								name: '已发布',
								typeId: '0',
								num: joblistyfb.length
							},
							{
								name: '已下架',
								typeId: '1',
								num: joblistyxj.length
							},
							]
							that.setData({
								joblistyfb: joblistyfb,
								joblistyxj: joblistyxj,
								section: section1
							})
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})


			}
		}
		let section1 = [{
			name: '已发布',
			typeId: '0',
			num: joblistyfb.length
		},
		{
			name: '已下架',
			typeId: '1',
			num: joblistyxj.length
		},
		]
		that.setData({
			joblistyfb: joblistyfb,
			joblistyxj: joblistyxj,
			section: section1
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		let that = this;
		await app.getOpenidReady();
		let openid = wx.getStorageSync('openid');
		console.log(openid);
		// 加载用户信息
		let loadRecruiterPromise = userRecruiterService.loadEntityById(openid);
		await loadRecruiterPromise.then((r) => {
			console.log(r);
			that.setData({
				companyUuid: r.data.companyUuid
			})
		}).catch((r) => {
			console.error(r);
		})

		// 加载职位列表
		let loadRecruitJobList = recruitJobService.loadListByCompanyUuid(this.data.companyUuid);
		await loadRecruitJobList.then((r) => {
			console.log(r);
			let joblistyfb = [];
			let joblistyxj = [];
			r.data.forEach(val => {
				let item = {
					id: val.id,
					jobname: val.jobName,
					money: new Salary(val.jobSalaryMin, val.jobSalaryMax).value,
					needs: val.recruitingNumber,
					gwyq: val.jobIntroduction,
					yl: val.countView,
					td: val.countApply,
					status: val.status,
				}
				if (val.status == CONSTANT.STATUS.DELETED) {
					joblistyxj.push(item);
				} else if (val.status == CONSTANT.STATUS.NORMAL) {
					joblistyfb.push(item);
				}
			})
			// list 设置
			that.setData({
				joblistyfb: joblistyfb,
				joblistyxj: joblistyxj,
			})

		}).catch((r) => {
			console.error(r);
		})
		console.log(this.data);


		wx.getSystemInfo({
			success: function (res) {
				that.setData({
					winWidth: res.windowWidth,
					winHeight: res.windowHeight,
				});
			}
		})
		let fblg = that.data.joblistyfb.length
		let xjlg = that.data.joblistyxj.length
		let section1 = [{
			name: '已发布',
			typeId: '0',
			num: fblg
		},
		{
			name: '已下架',
			typeId: '1',
			num: xjlg
		},
		]
		that.setData({
			section: section1
		});

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})