// pages/comxc/comxc.js
// pages/comxc/comxc.js
const $ = require('../../utils/request_util');
const string_util = require('../../utils/string_util');
const userRecruiterService = require('../../common/userRecruiterService');
const recruitCompanyService = require('../../common/recruitCompanyService');

const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		companyUuid: '',
		originLicensePhotoPath: '',
		imgxc: [],
	},
	//添加图片
	tjimg() {
		let that = this
		let imgxc = that.data.imgxc
		wx.chooseMedia({
			count: 1,
			mediaType: ['image'],
			sourceType: ['album', 'camera'],
			maxDuration: 30,
			camera: 'back',
			success(res) {
				console.log(res)
				let tempFiles = res.tempFiles
				if (imgxc.length == 0) {
					let arr = []
					for (let i = 0; i < tempFiles.length; i++) {
						let json = {}
						json.imgsrc = tempFiles[i].tempFilePath
						arr.push(json)
					}
					console.log(arr)
					that.setData({
						imgxc: arr
					})
				} else if (imgxc.length <= 9 && imgxc.length >= 0) {
					let arr = imgxc
					for (let i = 0; i < tempFiles.length; i++) {
						let json = {}
						json.imgsrc = tempFiles[i].tempFilePath
						arr.push(json)
					}
					console.log(arr)
					if (arr.length >= 9) {
						console.log("999")
						arr.splice(9)
						that.setData({
							imgxc: arr
						})
					} else {
						that.setData({
							imgxc: arr
						})
					}
					console.log(imgxc)
				}

			}
		})
	},
	//去掉图片
	qxbtn(e) {
		let that = this
		let imgxc = that.data.imgxc
		let imgsrc = e.currentTarget.dataset.imgsrc;
		for (let i = 0; i < imgxc.length; i++) {
			if (imgsrc == imgxc[i].imgsrc) {
				imgxc.splice([i], 1)
				that.setData({
					imgxc: imgxc
				})
			}
		}
		console.log(this.data);
	},
	//预览图片
	preimg(e) {
		let imgxc = this.data.imgxc
		let arrimg = []
		for (let i = 0; i < imgxc.length; i++) {
			arrimg.push(imgxc[i].imgsrc)
		}
		console.log(e.currentTarget.dataset.src)
		console.log(arrimg)
		let oimg = e.currentTarget.dataset.src
		wx.previewImage({
			current: oimg, // 当前显示图片的http链接
			urls: arrimg // 需要预览的图片http链接列表
		})
	},
	//保存
	async bc() {
		let that = this;
		let licensePhotoPath = (this.data.imgxc.length == 0) ? '' : this.data.imgxc[0].imgsrc;
		// 如果含有 web_path路径 则不执行操作  否则执行
		if (!licensePhotoPath.includes(app.globalData.web_path)) {
			if (string_util.isEmpty(licensePhotoPath)) {
				let updateData ={
					id : that.data.companyUuid,
					licensePhotoPath: '',
				}
				let updatePromise = recruitCompanyService.updateRecruitCompany(updateData);
				await updatePromise
					.then(r => console.log(r))
					.catch(r => console.error(r));
			} else {
				let uploadPromise = $.upload({
					url: '/recruit-company/uploadLicensePhoto?id=' + that.data.companyUuid,
					method: $.RequestMethod.POST,
					filePath: licensePhotoPath,
					formData: {},
					name: 'file',
					header: $.defaultHeader,
				});
				await uploadPromise
					.then(r => console.log(r))
					.catch(r => console.error(r));
			}
		}
		wx.navigateTo({
			url: '/pages/rzcenter/rzcenter',
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		let that = this;
		await app.getOpenidReady();
		let openid = wx.getStorageSync('openid');
		// 加载 招聘人
		let loadRecruiterPromise = userRecruiterService.loadEntityById(openid);
		await loadRecruiterPromise.then((r) => {
			console.log(r);
			that.setData({
				companyUuid: r.data.companyUuid
			})
		}).catch((r) => {
			console.error(r);
		})

		// 根据招聘人加载公司信息
		let loadCompanyPromise = recruitCompanyService.loadEntityById(this.data.companyUuid);
		await loadCompanyPromise.then((r) => {
			console.log(r);
			let licensePhotoPath =
				string_util.isEmpty(r.data.licensePhotoPath) ? '' : app.globalData.web_path + r.data.licensePhotoPath;
			imgxc_list = [];
			if(!string_util.isEmpty(licensePhotoPath)){
				imgxc_list.push({ imgsrc: licensePhotoPath });
			}
			that.setData({
				imgxc: imgxc_list,
				originLicensePhotoPath: r.data.licensePhotoPath,
			})
		}).catch((r) => {
			console.error(r);
		})
		console.log(this.data);


		wx.getSystemInfo({
			success: function (res) {
				let imgwd = (res.windowWidth - 40 - 30) / 3;
				let bight = imgwd * 1 + 30
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