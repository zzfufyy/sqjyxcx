// pages/comjbxx/comjbxx.js
const $ = require('../../utils/request_util');
const string_util = require('../../utils/string_util');
const userRecruiterService = require('../../common/userRecruiterService');
const recruitCompanyService = require('../../common/recruitCompanyService');
const communityInformationService = require('../../common/communityInformationService');
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		companyUuid: '',
		imgsrc: '',
		name: '',
		cellphone: '',
		array1: ['社区1', '街道1', '街道2'],
		index1: 0,
		positionData: '',
		communityUuidList: [],
		communityUuid: '',
		qyname:'',
		tyshxydm:'',
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
				// console.log(PAGENAME + '公司地址选择:'); console.log(res);
				that.setData({
					positionData: res.address + ' ' + res.name,
					// companyAddress: res.address + ' ' + res.name,
					longitude: res.longitude,
					latitude: res.latitude,
				})
			}
		})
	},
	// 统一社会信用代码
	bindinputLicenseId(e) {
		this.setData({
			tyshxydm: e.detail.value
		})
	},
	// 企业名称
	bindinputCompanyName(e){
		this.setData({
			qyname: e.detail.value
		})
	},
	//联系电话
	lxdhip(e){
		this.setData({
			cellphone: e.detail.value
		})
	},
	//点击企业标志
	xgtx() {
		let imgsrc = this.data.imgsrc
		let that = this
		wx.chooseMedia({
			count: 1,
			mediaType: ['image'],
			sourceType: ['album', 'camera'],
			camera: ['back', 'front'],
			success(res) {
				console.log(res.tempFiles[0].tempFilePath);
				that.setData({
					imgsrc: res.tempFiles[0].tempFilePath,
					none: 0
				})
			}
		})
	},
	// 保存
	async bc() {
		let that = this;
		// 如果图片路径不包含 web_path 或者为空 则不执行上传
		let flagUpload = true;
		if (string_util.isEmpty(that.data.imgsrc) || that.data.imgsrc.includes(app.globalData.web_path)) {
			flagUpload = false;
		}
		if (flagUpload) {
			let uploadPromise = $.upload({
				url: '/recruit-company/uploadPortrait?id=' + that.data.companyUuid,
				filePath: that.data.imgsrc,
				formData: {},
				name: 'file',
				header: app.globalData.header,
			});
			await uploadPromise
				.then((r) => { console.log(r) })
				.catch((r) => console.error(r));
		}
		let submitData = {
			id: this.data.companyUuid,
			companyName:this.data.qyname,
			licenseId:this.data.tyshxydm,
			communityUuid:this.data.communityUuid,
			// juridicalPerson: this.data.name,
			juridicalPhone: this.data.cellphone
		}
		console.log(submitData);
		let submitPromise = recruitCompanyService.updateRecruitCompany(submitData);
		await submitPromise.then((r) => {
			console.log(r);
		}).catch(r => console.error(r));
		wx.navigateTo({
			// url: '/pages/rzcenter/rzcenter?imgsrc=' + imgsrc + '&name=' + name + '&cellphone=' + cellphone,
			url: '/pages/rzcenter/rzcenter',
		})
	},
	name(e) {
		this.setData({
			name: e.detail.value
		})
	},
	cellphone(e) {
		this.setData({
			cellphone: e.detail.value
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
		let loadCompanyPromise = recruitCompanyService.loadEntityById(this.data.companyUuid);
		await loadCompanyPromise.then((r) => {
			console.log(r);
			let portraitPath =
				string_util.isEmpty(r.data.portraitPath) ? '' : app.globalData.web_path + r.data.portraitPath;
				let comlist = that.data.communityUuidList;
				let indexss=0 ;
				for(var i= 0;i<comlist.length;i++){
					if(r.data.communityUuid==comlist[i]){
						indexss=i;
					}
				}
				console.log(indexss)
			that.setData({
				imgsrc: portraitPath,
				name: r.data.juridicalPerson,
				cellphone: r.data.juridicalPhone,
				qyname:r.data.companyName,
				tyshxydm:r.data.licenseId,
				index1:indexss,
			
			})
		}).catch((r) => {
			console.error(r);
		})


	
		console.log(this.data.imgsrc);
		console.log(this.data.imgsrc.replaceAll(app.globalData.web_path, ''));

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