// pages/fbjob/fbjob.js
const {  genderList } = require('../../common/user');
const { Salary } = require('../../common/constant');
const CONSTANT = require('../../common/constant');
var string_util = require('../../utils/string_util');
const $ = require('../../utils/request_util');

const app = getApp();

let salary_list = [];
// 构建薪资范围list
salary_list = CONSTANT.salaryList;
let dataJobNum = 0;
console.log(salary_list[0].value);
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		companyUuid: '',
		companyName: '',
		companyAddress:'',
		datall: [
			{
				array: salary_list.map((val) => { return val.value }),
				// salay范围index
				index: 0,
				jobName: '',
				jobSalaryMin: salary_list[0].min,
				jobSalaryMax: salary_list[0].max,
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
			array: salary_list.map((val) => { return val.value }),
			// salay范围index
			index: 0,
			jobName: '',
			jobSalaryMin: salary_list[0].min,
			jobSalaryMax: salary_list[0].max,
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
		thisDatall[pindex].jobSalaryMin = salary_list[index].min;
		thisDatall[pindex].jobSalaryMax = salary_list[index].max;
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
		console.log(e)
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
		console.log(this.data.datall[pindex].jobIntroduction);
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
	qrfb() {
		let that = this;
		// 遍历检查名称
		let isEmptyJobName,isEmptyRecruitingNumber,isEmptyJobIntroduction = false;
		this.data.datall.forEach((val)=>{
			string_util.isEmpty(val.jobName)?isEmptyJobName = true:false;
			string_util.isEmpty(val.recruitingNumber)?isEmptyRecruitingNumber = true:false;
			string_util.isEmpty(val.jobIntroduction)?isEmptyJobIntroduction = true:false;
		})
		if(isEmptyJobName){
			wx.showModal({
				title: '提示',
				content: '请填写岗位名称',
			})
			return;
		}
		if(isEmptyRecruitingNumber){
			wx.showModal({
				title: '提示',
				content: '请正确填写招聘人数',
			})
			return;
		}
		if(isEmptyJobIntroduction){
			wx.showModal({
				title: '提示',
				content: '请填写岗位需求',
			})
			return;
		}
		let recruiterOpenid = wx.getStorageSync('openid');
		// 检验后提交
		this.data.datall.forEach((val) =>{	
			let submitData = {
				jobName: val.jobName,
				categoryName: val.jobName,
				jobIntroduction : val.jobIntroduction,
				jobSalaryMin : val.jobSalaryMin,
				jobSalaryMax : val.jobSalaryMax,
				jobAddress: this.data.companyAddress,
				recruitingNumber : val.recruitingNumber,
				companyUuid : this.data.companyUuid,
				companyName : this.data.companyName,
				recruiterOpenid: recruiterOpenid,
			}
			console.log(submitData);
		
			wx.request({
				url: app.globalData.web_path + '/recruit-job/add',
				method: $.RequestMethod.POST,
				header:  $.jsonHeader,
				data: submitData,
				success: function (res) {
					console.log(res);
				}
			});
		});

		// 跳转   企业认证中
		wx.navigateTo({
			url: '/pages/waiteyz/waiteyz',
		})

		
		

	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let that = this;
		// 获取 页面跳转传值  
		this.setData({
			// companyUuid: this.options.companyUuid,
			// companyName: this.options.companyName,
			// 测试
			companyUuid: '0f8062ae-77ae-4729-99ae-775fc6b5a4a0',
		});
		// 根据id获取企业信息
		wx.request({
			url: app.globalData.web_path + '/recruit-company/info?id='+ this.data.companyUuid,
			method: $.RequestMethod.GET,
			header:  $.jsonHeader,
			data: {},
			success: function (res) {
				console.log(res);
				that.setData({
					companyName: res.data.data.companyName,
					companyAddress: res.data.data.address,
				})
			}
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