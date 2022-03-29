// pages/searchpage/searchpage.js
const $ = require('../../utils/request_util');
const string_util = require('../../utils/string_util');
const userRecruiterService = require('../../common/userRecruiterService');
const recruitCompanyService = require('../../common/recruitCompanyService');
const recruitJobService = require('../../common/recruitJobService');
const userCandidateService = require('../../common/userCandidateService');
const CONSTANT = require('../../common/constant');
const { salaryList } = require('../../common/constant');


const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

		// 求职用户 信息
		userOpenid:'',
		userLon:0.0,
		userLat:0.0,

	

		// 弹窗
		sxkz: true,
		joblist: [
			{ jobname: '清洁工', jobmoney: '3000-3800', companyname: '文和友餐饮有限公司', companytx: '/img/tx.png', jl: '1.5', phonenum: '13112345678' },
			{ jobname: '清洁工', jobmoney: '3000-3800', companyname: '文和友餐饮有限公司', companytx: '/img/tx.png', jl: '1.5', phonenum: '13112345678' },
			{ jobname: '清洁工', jobmoney: '3000-3800', companyname: '文和友餐饮有限公司', companytx: '/img/tx.png', jl: '1.5', phonenum: '13112345678' },
		],
		// 月薪
		yxyq: [
			{ yxmoney: '不限', id: 0, checked: true }, { yxmoney: '2千以下', id: 1 }, { yxmoney: '2千-3千', id: 2 }, { yxmoney: '3千-4千', id: 3 }, { yxmoney: '4千-5千', id: 4 }, { yxmoney: '5千-7千', id: 5 }, { yxmoney: '7千-1万', id: 6 }, { yxmoney: '1万-1.5万', id: 7 }
		],
		index: '',

		// 距离
		nyxz: [
			{ nl: '不限', id: 0, checked: true }, { nl: '距离最近', id: 1 }
		],
		oid: 0,
		hidesx: true,
	},
	// 筛选事件
	sx() {
		let hidesx = !this.data.hidesx
		this.setData({
			hidesx: hidesx
		})
	},
	//月薪
	yxxz(e) {
		let id = e.currentTarget.dataset.id
		console.log(id)
		for (let i = 0; i < this.data.yxyq.length; i++) {
			if (this.data.yxyq[i].id == id) {
				if (this.data.yxyq[i].checked == true) {
					this.data.yxyq[i].checked = false;
				} else {
					this.data.yxyq[i].checked = true;
				}
			}
		}
		this.setData({
			yxyq: this.data.yxyq
		})
	},
	//距离
	nlfw(e) {

		let id = e.currentTarget.dataset.id
		console.log(id)
		for (let i = 0; i < this.data.nyxz.length; i++) {
			if (this.data.nyxz[i].id == id) {
				this.setData({
					oid: id
				})
			}
		}

	},
	//打电话
	callphone(e) {
		let phonenum = e.currentTarget.dataset.phonenum
		wx.makePhoneCall({
			phoneNumber: phonenum, //仅为示例，并非真实的电话号码
		})
	},
	//清空
	clear() {
		for (let i = 0; i < this.data.yxyq.length; i++) {
			this.data.yxyq[i].checked = false;
		}
		for (let q = 0; q < this.data.nyxz.length; q++) {
			this.setData({
				oid: 100
			})
		}
		this.setData({
			yxyq: this.data.yxyq
		})
	},
	//确定
	qd() {
		let hidesx = !this.data.hidesx
		this.setData({
			hidesx: hidesx
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
		let yxyq_list  = [];
		yxyq: [
			{ yxmoney: '不限', id: 0, checked: true }, { yxmoney: '2千以下', id: 1 }, { yxmoney: '2千-3千', id: 2 }, { yxmoney: '3千-4千', id: 3 }, { yxmoney: '4千-5千', id: 4 }, { yxmoney: '5千-7千', id: 5 }, { yxmoney: '7千-1万', id: 6 }, { yxmoney: '1万-1.5万', id: 7 }]
		let	salaryList = CONSTANT.salaryList;
		salaryList.forEach((v,i)=>{
			let yxmoney = v.value;
			let id =i;
			let checked = false;
			if(v.min ==0 && v.max==0){
				yxmoney = '不限';
				checked = true;
			}
			yxyq_list.push({
				min: v.min,
				max: v.max,
				yxmoney:yxmoney,
				id:id,
				checked:checked,
			})
		})
		that.setData({
			yxyq:yxyq_list,
		})
		// 获取求职用户信息
		let loadUserPromise = userCandidateService.loadEntityById(openid);
		loadUserPromise.then(r=>{
			// 加载用户信息
			that.setData({
				userOpenid:openid,
				userLon: r.data.lon,
				userLat: r.data.lat,
			})
		}).catch(r=>{
			console.error(r);
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