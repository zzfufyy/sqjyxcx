// pages/qyzc/qyzc.js
var QQMapWX = require('../../mapjs/qqmap-wx-jssdk.js');
const string_util = require('../../utils/string_util');
const $ = require('../../utils/request_util');


// 实例化API核心类
const app = getApp()

Page({
	
	/**
	 * 页面的初始数据
	 */
	data: {
		// 企业名称
		companyName:'',
		// 分类选择
		array: ['IT', '文化传媒', '电子制造'], // categoryName
		categoryUuid_list: [],
		categoryUuid:'',
		index: 0,
		// 社区选择
		array1: ['社区1', '街道1', '街道2'], // communityName
		communityUuid_list: [],
		communityUuid:'',
		index1: 0,
		positionData: '',
		licenseId:'',
		wantjob: [{ job: 'IT', id: 0 }, { job: '文化传媒', id: 1 }, { job: '电子制造', id: 2 }, { job: '电子制造', id: 3 }, { job: '电子制造', id: 4 }],
		datdid: ''
	},
	// 更换企业名字
	bindinputCompanyName(e){
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
			communityUuid: this.data.communityUuid_list[e.detail.value],
		})
		console.log(this.data)
	},
	// 更改定位
	changedw(e) {
		let that = this
		wx.chooseLocation({
			type: 'gcj02',
			success(res) {
				console.log(res)
				const latitude = res.latitude
				const longitude = res.longitude
				var positionData = res.address
				that.setData({
					positionData: positionData
				})
			}
		})
	},
	// 统一社会信用代码
	bindinputLicenseId(e){
		this.setData({
			licenseId:e.detail.value
		})
	},
	// 招聘岗位意向去除
	closethis(e) {
		let id = e.currentTarget.dataset.id
		console.log(id)
		for (let i = 0; i < this.data.wantjob.length; i++) {
			if (this.data.wantjob[i].id == id) {
				if (this.data.wantjob[i].checked == true) {
					this.data.wantjob[i].checked = false;
				} else {
					this.data.wantjob[i].checked = true;
				}
			}
		}
		this.setData({
			wantjob: this.data.wantjob,
			msg: "id:" + id
		})
	},

	//企业注册提交审核
	wstijsq() {
		let that = this;
		let openid = wx.getStorageSync('openid');
		console.log(openid);
		let companyName = this.data.companyName;
		if(string_util.isEmpty(companyName)){
			wx.showModal({
				title: '提示',
				content: '必须填写企业名称',
			})
			return;
		}
		let communityUuid = this.data.communityUuid;
		if(string_util.isEmpty(communityUuid)){
			wx.showModal({
				title: '提示',
				content: '必须选择所属社区',
			})
			return;
		}
		let address = this.data.positionData;
		let licenseId = this.data.licenseId;
		let recruiterOpenid = openid; 
		let recruitCompany =  {
			companyName,
			communityUuid,
			address,
			licenseId,
			recruiterOpenid
		}
		console.log(recruitCompany);
		let companyUuid;
		wx.request({
			url: app.globalData.web_path + '/recruit-company/add?openid='+ openid,
			method: $.RequestMethod.POST,
			header:  $.jsonHeader,
			data: recruitCompany,
			success: function (res) {
				console.log(res);
				companyUuid = res.data.data;
				console.log(companyUuid);
				wx.navigateTo({
					url: '/pages/fbjob/fbjob?companyUuid=' + companyUuid,
				})
			}
		});
		
		
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this
		var openid = wx.getStorageSync('openid');
		console.log(openid);

		// 获取社区列表
		wx.request({
			url: app.globalData.web_path + '/community-info/list',
			data: {
			},
			header: app.globalData.header,
			success: function (res) {
				communityName_list = new Array();
				communityUuid_list = new Array();
				res.data.data.forEach(function (item, index) {
					communityName_list.push(item.communityName);
					communityUuid_list.push(item.id);
				});
				console.log(communityName_list);
				that.setData({
					array1: communityName_list,
					communityUuid_list: communityUuid_list,
					communityUuid: communityUuid_list[0],
				})
			}
		});
		// 获取行业分类列表
		wx.request({
			url: app.globalData.web_path + '/job-category/list',
			data: {
			},
			header: app.globalData.header,
			success: function (res) {
				wantjob_list = [];
				i = 0;
				res.data.data.forEach(function (item, index) {
					if(i>10) return;
					let temp = {
						job:item.categoryName,
						id:i,
						categoryUuid:item.categoryUuid
					}
					wantjob_list.push(temp);
					i++;
				});
				that.setData({
					wantjob:wantjob_list
				})

			}
		});
		var qqmapsdk = new QQMapWX({
			key: 'Z3WBZ-TX76I-CKXGO-5GWTU-CSSK3-7LBFO' // 必填
		});

		// 获取位置信息
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
						console.log(res.data)
						var positionData = res.data.result.address
						that.setData({
							positionData: positionData
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