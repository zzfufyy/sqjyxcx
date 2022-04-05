// pages/qysearch/qysearch.js
const $ = require('../../utils/request_util');
const Loading = require('../../utils/loading_util');
const CONSTANT = require('../../common/constant');
const { Salary } = require('../../common/constant');
// 加载服务
const recruitJobService = require('../../common/recruitJobService');
const viewRecordService = require('../../common/viewRecordService');


// // 附加模块
const qysearchEx = require('./qysearchEx');
const userCandidateService = require('../../common/userCandidateService');

const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */

	data: {
		companyUuid: '',
		location: {},

		compangjob: [
			// {
			// 	jobname: '服务员/保洁', usertag: [{ tagbq: '女' }, { tagbq: '29岁' }, { tagbq: '3000-5000/月' }],
			// 	name: '张三', tximg: '/img/tx.png', hxtime: '10分钟前', sqname: '天源社区', companyjuli: '1.2',
			// },
			// {
			// 	jobname: '服务员/保洁', usertag: [{ tagbq: '女' }, { tagbq: '29岁' }, { tagbq: '3000-5000/月' }],
			// 	name: '李四', tximg: '/img/tx.png', hxtime: '10分钟前', sqname: '天源社区', companyjuli: '1.2',
			// },
			// {
			// 	jobname: '服务员/保洁', usertag: [{ tagbq: '女' }, { tagbq: '29岁' }, { tagbq: '3000-5000/月' }],
			// 	name: '王二', tximg: '/img/tx.png', hxtime: '10分钟前', sqname: '天源社区', companyjuli: '1.2',
			// },

		],
		// 月薪要求
		yxyq: [
			{ yxmoney: '不限', id: 0, checked: true }, { yxmoney: '2千以下', id: 1 }, { yxmoney: '2千-3千', id: 2 }, { yxmoney: '3千-4千', id: 3 }, { yxmoney: '4千-5千', id: 4 }, { yxmoney: '5千-7千', id: 5 }, { yxmoney: '7千-1万', id: 6 }, { yxmoney: '1万-1.5万', id: 7 }
		],
		index: '',

		// 年龄范围
		nyxz: [
			// {nl:'不限',id:0,checked:true},{nl:'20-30岁',id:1},{nl:'30-40岁',id:2},{nl:'40-50岁',id:3},{nl:'50-60岁',id:4},
		],
		// 工作经验
		gzjy: [
			// {jy:'不限',id:0,checked:true},{jy:'1-3年',id:1},{jy:'3-5年',id:2},{jy:'5-10年',id:3},{jy:'10年以上',id:4},
		],
		hidesx: true,
	},
	// 筛选事件
	sx() {
		let hidesx = !this.data.hidesx
		this.setData({
			hidesx: hidesx
		})
	},
	//清空
	clear() {
		console.log(this.data.yxyq)
		let yxyqList = this.data.yxyq.map((v) => {
			v.checked = false;
			return v;
		})
		console.log(yxyqList);
		for (let q = 0; q < this.data.nyxz.length; q++) {
			this.setData({
				oid: 100
			})
		}
		this.setData({
			yxyq: yxyqList
		})
	},
	//确定
	async qd() {
		Loading.begin();
		// 获取薪资范围参数
		let yxyqList = this.data.yxyq.filter((v) => {
			return v.checked == true;
		})
		let currentYxyq = yxyqList[0];
		if (currentYxyq == undefined || currentYxyq.id == 0) {
			await this.clearContent();
			await this.loadContent();

		} else {
			await this.clearContent();
			await this.loadContent(currentYxyq.min, currentYxyq.max);
		}
		Loading.end();
		let hidesx = !this.data.hidesx
		this.setData({
			hidesx: hidesx
		})
	},
	// 点击跳转到对应求职者
	async bindtapChooseCandidate(e) {
		let candidateData = await this.data.compangjob[e.currentTarget.dataset.index]
		let candidateOpenid = candidateData.candidateOpenid;
		// TODO 生成浏览记录  +  浏览量+1
		try {
			Loading.begin();
			await userCandidateService.increaseViewCount(candidateOpenid);
			console.log('increasecountview完成');
			// 构建ViewRecord
			let viewRecord = {
				candidateOpenid: candidateOpenid,
				recruiterOpenid: '',
				companyUuid: this.data.companyUuid,
			}
			await viewRecordService.insertByEntity(viewRecord)
		} catch (e) {
			console.log(e);
		} finally {
			Loading.end();
			wx.navigateTo({
				url: "/pages/loojl/lookjl?candidateOpenid=" + candidateOpenid,
			})
		}

	},
	//月薪选择
	yxxz(e) {
		let id = e.currentTarget.dataset.id
		let yxyq_list = this.data.yxyq.map((v, i) => {
			v.checked = (i == id) ? true : false;
			return v;
		})
		this.setData({
			yxyq: yxyq_list
		})
	},
	//年龄范围
	nlfw(e) {
		let id = e.currentTarget.dataset.id
		console.log(id)
		for (let i = 0; i < this.data.nyxz.length; i++) {
			if (this.data.nyxz[i].id == id) {
				if (this.data.nyxz[i].checked == true) {
					this.data.nyxz[i].checked = false;
				} else {
					this.data.nyxz[i].checked = true;
				}
			}
		}
		this.setData({
			nyxz: this.data.nyxz
		})
	},
	//工作经验
	gzjy(e) {
		let id = e.currentTarget.dataset.id
		console.log(id)
		for (let i = 0; i < this.data.gzjy.length; i++) {
			if (this.data.gzjy[i].id == id) {
				if (this.data.gzjy[i].checked == true) {
					this.data.gzjy[i].checked = false;
				} else {
					this.data.gzjy[i].checked = true;
				}
			}
		}
		this.setData({
			gzjy: this.data.gzjy
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		// 
		let that = this;
		// 获取用户openid
		await app.getOpenidReady();
		let openid = wx.getStorageSync('openid');


		// 搜索条件 - 加载薪资
		let yxyq_list = [];
		let salaryList = CONSTANT.salaryList;
		// 特殊 - 不限薪资
		let unlimitSalary = new Salary(-1, -1);
		yxyq_list = salaryList.map((v, i) => {
			return {
				min: v.min,
				max: v.max,
				yxmoney: v.value,
				id: i + 1, // 预留第一位为默认 薪资不限
				checked: false,
			}
		});
		yxyq_list.unshift({
			min: unlimitSalary.min,
			max: unlimitSalary.max,
			yxmoney: unlimitSalary.value,
			id: 0,
			checked: true,
		})
		this.setData({
			yxyq: yxyq_list,
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: async function () {
		Loading.begin();
		// 需要openid 加載用戶參數
		await app.getOpenidReady();
		// 每次进入前清空content
		await this.clearContent();
		await this.loadContent();
		Loading.end();
	},
	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: async function () {
		Loading.begin();
		await this.loadContent();
		Loading.end();
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
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},

	...qysearchEx.createPageMethods(),


})