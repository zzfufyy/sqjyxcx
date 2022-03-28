// pages/personjl/personjl.js
const $ = require('../../utils/request_util');
const string_util = require('../../utils/string_util');
const userRecruiterService = require('../../common/userRecruiterService');
const recruitCompanyService = require('../../common/recruitCompanyService');
const app = getApp();

Page({

	/**
	 * 页面的初始数据
	 */
	data: {

		tximg: '',
		name: '',
		companyUuid: '',
		companyname: '',
		comadress: '',
		ygz: '3000-5000',

		gzjy: '介绍一下企业',
		boolean: true,
		qyxc: '添加企业相册展示企业风采',
		selfpj: true,
		photoPath: '', // 相册总路径
		zwpj: [
			// { imgqy: '/img/tx.png' },
			// { imgqy: '/img/share.png' },
			// { imgqy: '/img/msgw.png' },
		],
		licensePhotoPath: '', // 营业执照路径
		imgyyzz: [{ img: '/img/qhsf.png' }]
	},
	//工作经历  添加
	gzjltj() {
		wx.navigateTo({
			url: '/pages/gzjl/gzjl',
		})
	},
	//公司地址
	changedw() {
		wx.navigateTo({
			url: '/pages/comadrres/comadrres',
		})
	},
	//企业介绍
	gzjltj() {
		wx.navigateTo({
			url: '/pages/comjs/comjs',
		})
	},
	//企业相册点击放大
	preimg1(e) {
		let zwpj = this.data.zwpj
		let arrimg = []
		for (let i = 0; i < zwpj.length; i++) {
			arrimg.push(zwpj[i].imgqy)
		}
		let oimg = e.currentTarget.dataset.src
		wx.previewImage({
			current: oimg, // 当前显示图片的http链接
			urls: arrimg // 需要预览的图片http链接列表
		})
	},
	//营业执照点击放大
	preimg(e) {
		let imgyyzz = this.data.imgyyzz
		let arrimg = []
		for (let i = 0; i < imgyyzz.length; i++) {
			arrimg.push(imgyyzz[i].img)
		}
		let oimg = e.currentTarget.dataset.src
		wx.previewImage({
			current: oimg, // 当前显示图片的http链接
			urls: arrimg // 需要预览的图片http链接列表
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

		// 根据openid 加载 招聘人信息
		let loadRecruiterPromise = userRecruiterService.loadEntityById(openid);
		loadRecruiterPromise.then(r => {
			that.setData({
				name: r.data.realName,
				companyUuid: r.data.companyUuid,
			})
			console.log(r)
		}).catch(r =>
			console.error(r)
		)
		await loadRecruiterPromise;
		console.log(this.data.companyUuid);
		// 根据companyUuid 加载 企业信息
		let loadCompanyPromise = recruitCompanyService.loadEntityById(this.data.companyUuid);
		loadCompanyPromise.then(r => {
			console.log(r);
			that.setData({
				tximg: app.globalData.web_path + r.data.portraitPath,
				companyname: r.data.companyName,
				comadress: r.data.address,
				gzjy: r.data.introduction,
				photoPath: r.data.photoPath,
				licensePhotoPath: r.data.licensePhotoPath,
			})
		}).catch(r => {
			console.error(r);
		});
		await loadCompanyPromise;
		// 根据 企业相册 营业执照 展示
		let photoPath_list = string_util.splitBySemiColon(this.data.photoPath);
		let temp_zwpj = this.data.zwpj;
		if (photoPath_list.length > 0) {
			photoPath_list.forEach(val => {
				temp_zwpj.push({ imgqy: app.globalData.web_path + val })
			})
		}
		this.setData({
			zwpj: temp_zwpj,
			imgyyzz: [{ img: app.globalData.web_path + this.data.licensePhotoPath }],

		});

		let ocomadress = options.comadress
		// this.setData({
		// 	comadress: ocomadress,
		// 	tximg: options.imgsrc,
		// 	name: options.name,
		// 	jszj: options.jszj,
		// })
		wx.getSystemInfo({
			success: function (res) {
				let imgwd = (res.windowWidth - 40 - 30) / 3;
				let bight = (res.windowWidth - 40 - 30) / 4
				that.setData({
					imgwd: imgwd,
					bight: bight
				})
			}
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