// pages/qyzc/qyzc.js
var QQMapWX = require('../../mapjs/qqmap-wx-jssdk.js');
// 加载工具类
const string_util = require('../../utils/string_util');
const $ = require('../../utils/request_util');
const Loading = require('../../utils/loading_util');
const CONSTANT = require('../../common/constant');
// 加载接口服务
const userRecruiterService = require('../../common/userRecruiterService');
const recruitCompanyService = require('../../common/recruitCompanyService');
const recruitJobService = require('../../common/recruitJobService');
const communityInformationService = require('../../common/communityInformationService');
const jobCategoryService = require('../../common/jobCategoryService');
const companyForCategoryService = require('../../common/companyForCategoryService');

// 常量定义
const app = getApp();
const PAGENAME = 'qyzc.js - ';
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		// 招聘人
		recruiterOpenid: '',
		// 企业名称
		companyName: '',
		companyAddress: '',
		longitude: 0.0,
		latitude: 0.0,
		// 分类选择
		array: ['IT', '文化传媒', '电子制造'], // categoryName
		categoryUuid_list: [],
		categoryUuid: '',
		index: 0,
		// 社区选择
		array1: ['社区1', '街道1', '街道2'], // communityName
		communityUuidList: [],
		communityUuid: '',
		index1: 0,
		positionData: '',
		licenseId: '',
		wantjob: [
			// { job: 'IT', id: 0 }, { job: '文化传媒', id: 1 }, { job: '电子制造', id: 2 }, { job: '电子制造', id: 3 }, { job: '电子制造', id: 4 }
		],
		datdid: ''
	},
	// 企业名字
	bindinputCompanyName(e) {
		this.setData({
			companyName: e.detail.value
		})
	},
	// 行业分类选择
	bindPickerChange(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			index: e.detail.value,
			categoryUuid: this.data.categoryUuid_list[e.detail.value],
		})
	},

	// 社区选择
	bindPickerChange1(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			index1: e.detail.value,
			communityUuid: this.data.communityUuidList[e.detail.value],
		})
		console.log(this.data)
	},
	// 更改定位
	changedw(e) {
		let that = this
		wx.chooseLocation({
			type: 'gcj02',
			success(res) {
				console.log(PAGENAME + '公司地址选择:'); console.log(res);
				that.setData({
					positionData: res.address + ' ' + res.name,
					companyAddress: res.address + ' ' + res.name,
					longitude: res.longitude,
					latitude: res.latitude,
				})
			}
		})
	},
	// 统一社会信用代码
	bindinputLicenseId(e) {
		this.setData({
			licenseId: e.detail.value
		})
	},
	// 招聘岗位意向去除
	closethis(e) {
		let id = e.currentTarget.dataset.id
		console.log(id)
		let wantjobList = [];
		this.data.wantjob.forEach((v) => {
			if (v.id == id) {
				if (v.checked == true) {
					v.checked = false;
				} else { v.checked = true }
			}
			wantjobList.push(v);
		})
		this.setData({
			wantjob: wantjobList,
			msg: "id:" + id
		})
		console.log(PAGENAME + '意向表：'); console.log(this.data.wantjob);
	},

	//企业注册提交审核
	async wstijsq() {
		let that = this;
		let companyName = this.data.companyName;
		
		// 企业名称检测
		if (string_util.isEmpty(companyName)) {
			wx.showModal({
				title: '提示',
				content: '必须填写企业名称',
			})
			return;
		}
		// 提交开始
		Loading.begin();
		let recruitCompany = {
			companyName: this.data.companyName,
			communityUuid: this.data.communityUuid,
			address: this.data.companyAddress,
			lon: this.data.longitude,
			lat: this.data.latitude,
			licenseId: this.data.licenseId,
			recruiterOpenid: this.data.recruiterOpenid,
		}
		console.log(recruitCompany);
		
		let insertCompanyPromise = recruitCompanyService.insertByEntity(this.data.recruiterOpenid, recruitCompany)
		let companyUuid;
		await insertCompanyPromise.then(r=>{
			console.log(PAGENAME + '新增企业id: '); console.log(r);
			companyUuid =  r.data;
		});
		
		// 意向添加到 company_for_category
		//构建list<entity>
		let categoryList = [];
		this.data.wantjob.forEach(v=>{
			if(v.checked == false){
				categoryList.push({
					companyUuid: companyUuid,
					categoryUuid: v.categoryUuid,
					categoryName: v.job,
				})
			}
		});
		let insertListPromise = companyForCategoryService.insertByEntityList(categoryList);
		await insertListPromise.then(r=>{
			console.log(r);
		}).catch(r=>{
			console.error(r);
		})
		// 提交结束
		Loading.end()
		// 页面跳转
		wx.navigateTo({
			url: '/pages/fbjob/fbjob',
	 	})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		Loading.begin();
		let that = this;
		await app.getOpenidReady();
		let openid = wx.getStorageSync('openid');
		console.log(PAGENAME + '当前用户openid: ' + openid);
		this.setData({ recruiterOpenid: openid});
		// 获取社区列表
		let loadCommunityListPromise = communityInformationService.loadList();
		await loadCommunityListPromise.then(r => {
			let communityNameList = []; let communityUuidList = [];
			r.data.forEach((item) => {
				communityNameList.push(item.communityName);
				communityUuidList.push(item.id);
			});
			that.setData({
				array1: communityNameList,
				communityUuidList: communityUuidList,
				communityUuid: communityUuidList[0],
			})

		}).catch(r => {
			console.error(PAGENAME + r);
		})

		let loadCategoryListPromise = jobCategoryService.loadList();
		await loadCategoryListPromise.then(r => {
			let wantjobList = [];
			r.data.forEach(function (item, index) {
				wantjobList.push({
					job: item.categoryName,
					id: index,
					categoryUuid: item.id,
					checked: false,
				});
			});
			that.setData({
				wantjob: wantjobList
			})
		}).catch(r => {
			console.error(r);
		})
		var qqmapsdk = new QQMapWX({
			key: 'Z3WBZ-TX76I-CKXGO-5GWTU-CSSK3-7LBFO' // 必填
		});

		// 获取位置信息  默认位置
		wx.getLocation({
			type: 'gcj02',
			success(res) {
				console.log(res)
				const latitude = res.latitude
				const longitude = res.longitude
				wx.request({
					url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + latitude + ',' + longitude + '&key=Z3WBZ-TX76I-CKXGO-5GWTU-CSSK3-7LBFO&get_poi=0',
					method: 'GET',
					success(res) {
						let tempData = res.data.result;
						that.setData({
							positionData: tempData.address + ' ' + tempData.formatted_addresses.recommend,
							companyAddress: tempData.address + ' ' + tempData.formatted_addresses.recommend,
							longitude: tempData.location.lng,
							latitude: tempData.location.lat,
						})
					}
				})
				// qqmapsdk.reverseGeocoder({
				// 	success:function(res){
				// 		var address = res.result.address
				// 		console.log(address)
				// 	console.log(latitude)

				// 		that.setData({
				// 			latitude:latitude,
				// 			longitude:longitude,
				// 			positionData: address
				// 		})
				// 	}
				// })
			}
		});
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