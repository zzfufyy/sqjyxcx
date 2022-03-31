// pages/fbjob/fbjob.js
const CONSTANT = require('../../common/constant');
var string_util = require('../../utils/string_util');
const $ = require('../../utils/request_util');

const userRecruiterService = require('../../common/userRecruiterService');
const recruitCompanyService = require('../../common/recruitCompanyService');
const recruitJobService = require('../../common/recruitJobService');

const Loading = require('../../utils/loading_util');
const app = getApp();

const PAGENAME = 'fbjob.js - ';
let dataJobNum = 0;
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		recruiterOpenid: '',
		// 是否已认证
		flagIdentification: 0,
		companyUuid: '',
		companyName: '',
		companyAddress: '',
		datall: [
			{
				array: CONSTANT.salaryList.map((val) => { return val.value }),
				// salay范围index
				index: 0,
				jobName: '',
				jobSalaryMin: CONSTANT.salaryList[0].min,
				jobSalaryMax: CONSTANT.salaryList[0].max,
				jobIntroduction: '',
				recruitingNumber: '',
				pindex: dataJobNum,
				ppindex: 0,
				sbpp: "",
			},
		],
		dyxz: "",
	},
	//继续添加
	jxtj(e) {
		let that = this
		let odatall = that.data.datall
		dataJobNum++;
		let newitem = {
			array: CONSTANT.salaryList.map((val) => { return val.value }),
			// salay范围index
			index: 0,
			jobName: '',
			jobSalaryMin: CONSTANT.salaryList[0].min,
			jobSalaryMax: CONSTANT.salaryList[0].max,
			jobIntroduction: '',
			recruitingNumber: '',
			pindex: dataJobNum,
			ppindex: 0,
			sbpp: "",
		}
		this.setData({
			datall: that.data.datall.concat(newitem),
		})
	},

	/**获取岗位名称**/
	setInputValue2: function (e) {
		let pindex = e.target.dataset.index; //数组下标
		let thisDatall = this.data.datall;
		thisDatall[pindex].jobName = e.detail.value  //赋值
		this.setData({
			datall: thisDatall
		})
		// console.log(this.data.datall[pindex].jobName);
	},
	// 薪资范围选择
	bindPickerChange(e) {
		let thisDatall = this.data.datall;
		let pindex = e.target.dataset.index; //数组下标
		let index = e.detail.value;
		thisDatall[pindex].jobSalaryMin = CONSTANT.salaryList[index].min;
		thisDatall[pindex].jobSalaryMax = CONSTANT.salaryList[index].max;
		thisDatall[pindex].index = index;
		console.log('picker发送选择改变，携带值为', e.detail.value)
		// console.log(ppindex)
		this.setData({
			datall: thisDatall,
			color: "#000"
		})
		console.log(this.data.datall[pindex].array[index]);
	},
	// 招聘人数
	bindinputRecruitingNumber(e) {
		let pindex = e.target.dataset.index; //数组下标
		let thisDatall = this.data.datall;

		thisDatall[pindex].recruitingNumber = e.detail.value  //赋值
		this.setData({
			datall: thisDatall
		})
	},
	/**岗位需求**/
	setInputValue3: function (e) {
		let pindex = e.target.dataset.index; //数组下标
		let thisDatall = this.data.datall;
		thisDatall[pindex].jobIntroduction = e.detail.value  //赋值
		this.setData({
			datall: thisDatall
		})
	},

	/****删除*/
	deletePrice: function (e) {
		let that = this
		let index = e.target.dataset.index //数组下标
		let arrayLength = that.data.datall.length //数组长度
		let newArray = []
		if (arrayLength > 1) {
			//数组长度>1 才能删除
			for (let i = 0; i < arrayLength; i++) {
				if (i !== index) {
					newArray.push(that.data.datall[i])
				}
			}
			that.setData({
				datall: newArray
			})
		} else {
			wx.showModal({
				title: '提示',
				content: '必须设置一个设备',
				success(res) {
					if (res.confirm) {
						console.log('用户点击确定')
					} else if (res.cancel) {
						console.log('用户点击取消')
					}
				}
			})
		}
	},
	// 确认发布
	async qrfb() {
		let that = this;
		// 遍历检查名称
		let isEmptyJobName, isEmptyRecruitingNumber, isEmptyJobIntroduction = false;
		this.data.datall.forEach((val) => {
			string_util.isEmpty(val.jobName) ? isEmptyJobName = true : false;
			string_util.isEmpty(val.recruitingNumber) ? isEmptyRecruitingNumber = true : false;
			string_util.isEmpty(val.jobIntroduction) ? isEmptyJobIntroduction = true : false;
		})
		if (isEmptyJobName) {
			wx.showModal({
				title: '提示',
				content: '请填写岗位名称',
			})
			return;
		}
		if (isEmptyRecruitingNumber) {
			wx.showModal({
				title: '提示',
				content: '请正确填写招聘人数',
			})
			return;
		}
		if (isEmptyJobIntroduction) {
			wx.showModal({
				title: '提示',
				content: '请填写岗位需求',
			})
			return;
		}
		// 提交数据
		Loading.begin();
		this.data.datall.forEach(async (val) => {
			let submitData = {
				jobName: val.jobName,
				categoryName: val.jobName,
				jobIntroduction: val.jobIntroduction,
				jobSalaryMin: val.jobSalaryMin,
				jobSalaryMax: val.jobSalaryMax,
				jobAddress: this.data.companyAddress,
				recruitingNumber: val.recruitingNumber,
				companyUuid: this.data.companyUuid,
				companyName: this.data.companyName,
				recruiterOpenid: this.data.recruiterOpenid,
			}
			console.log(PAGENAME + '提交数据:'); console.log(submitData);
			let submitPromise = recruitJobService.insertByEntity(submitData)
			await submitPromise.then(r => {
				console.log(r);
			}).catch(r => {
				console.error(r);
			});
		});
		Loading.end();

		let flagIdentification = this.data.flagIdentification;
		console.log(PAGENAME + '企业验证状态: ' + flagIdentification);
		wx.showToast({
			title: '发布成功',
			icon: 'success',
			duration: 2000,
			success: function () {
				// 跳转 企业认证中
				console.log(PAGENAME + '发布成功 -> 页面跳转');
				if (flagIdentification == 0) {
					wx.navigateTo({
						url: '/pages/waiteyz/waiteyz',
					})
				} else if (flagIdentification == 1) {
					wx.switchTab({
						url: '/pages/mine/mine',
					})
				}
			}
		})






	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		// 页面加载开始
		Loading.begin();
		let that = this;
		await app.getOpenidReady();
		let openid = wx.getStorageSync('openid');
		this.setData({
			recruiterOpenid: openid,
		})
		// 招聘人openid
		console.log(PAGENAME - '招聘人openid:' + openid);
		let loadRecruitPromise = userRecruiterService.loadEntityById(openid);
		await loadRecruitPromise.then(r => {
			that.setData({
				companyUuid: r.data.companyUuid,

			})
		}).catch(r => {
			console.error(PAGENAME); console.error(r);
		})
		console.log(PAGENAME + "招聘人企业id:" + this.data.companyUuid);

		let loadCompanyPromise = recruitCompanyService.loadEntityById(this.data.companyUuid);
		await loadCompanyPromise.then(r => {
			console.log(r);
			that.setData({
				companyName: r.data.companyName,
				flagIdentification: r.data.flagIdentification,
			})
		}).catch(r => {
			console.error(r);
		})
		// 加载完毕
		Loading.end();

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