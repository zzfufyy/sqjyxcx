// pages/editjob/editjob.js
const $ = require('../../utils/request_util');
const string_util = require('../../utils/string_util');
const userRecruiterService = require('../../common/userRecruiterService');
const recruitCompanyService = require('../../common/recruitCompanyService');
const recruitJobService = require('../../common/recruitJobService');
const CONSTANT = require('../../common/constant');
const { Salary, salaryList } = require('../../common/constant');

const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		id: '',
		jobName: '',
		array: [],
		salaryList: [],
		index: 0,
		recruitingNumber: '',
		jobIntroduction: '',
	},
	// 获取岗位名称
	bindinputJobName: function (e) {
		this.setData({
			jobName: e.detail.value,
		})
		// console.log(e)
	},
	// 薪资范围选择
	bindPickerChange(e) {
		this.setData({
			index: e.detail.value,
			color: "#000"
		})
	},
	// 招聘人数
	bindinputRecruitingNumber(e) {
		this.setData({
			recruitingNumber: e.detail.value,
			color1: "#000"
		})
	},

	/**岗位需求**/
	setInputValue3: function (e) {
		this.setData({
			jobIntroduction: e.detail.value,
		})
	},
	//完成
	async jxtj(e) {
		// 提交
		let updateData = {
			id: this.data.id,
			jobName: this.data.jobName,
			jobSalaryMin: CONSTANT.salaryList[this.data.index].min,
			jobSalaryMax: CONSTANT.salaryList[this.data.index].max,
			recruitingNumber: this.data.recruitingNumber,
			jobIntroduction: this.data.jobIntroduction,
		}
		console.log(updateData);
		let updatePromise = recruitJobService.updateByEntity(updateData);
		await updatePromise
			.then(r => console.log(r))
			.catch(r => console.error(r))
		wx.navigateTo({
			url: '/pages/manegejob/manegejob',
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		let that = this
		// url接收参数为  recruitJobService的id
		let id = this.options.id;
		this.setData({
			id: id,
			salaryList: CONSTANT.salaryList,
			array: CONSTANT.salaryList.map(v => v.value),
		})
		let loadPromise = recruitJobService.loadEntityById(id);
		await loadPromise.then(r => {
			console.log(r)
			let salary = new Salary(r.data.jobSalaryMin, r.data.jobSalaryMax);
			let index = 0;
			CONSTANT.salaryList.forEach((v, i, arr) => {
				if (JSON.stringify(v) == JSON.stringify(salary)) {
					index = i;
				}
			})
			that.setData({
				jobName: r.data.jobName,
				index: index,
				recruitingNumber: r.data.recruitingNumber,
				jobIntroduction: r.data.jobIntroduction,

			})
		}).catch(r => { console.error(r) });

		this.setData({
			id: id,
			salaryList: CONSTANT.salaryList,
			array: CONSTANT.salaryList.map(v => v.value),
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