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
		originPhotoPath:'',
		companyUuid:'',
		imgxc:[],
	},
	//添加图片
	tjimg(){
		let that = this
		let imgxc = that.data.imgxc
		wx.chooseMedia({
			count: 9,
			mediaType: ['image'],
			sourceType: ['album', 'camera'],
			maxDuration: 30,
			camera: 'back',
			success(res) {
				console.log(res)
				let tempFiles = res.tempFiles
				if(imgxc.length == 0){
					let arr = []
					for(let i = 0;i <tempFiles.length;i++ ){
						let json = {}
						json.imgsrc = tempFiles[i].tempFilePath
						arr.push(json)
					}
					console.log(arr)
					that.setData({
						imgxc:arr
					})
				}else if(imgxc.length<=9 && imgxc.length>=0){
					let arr = imgxc
					for(let i = 0;i <tempFiles.length;i++ ){
						let json = {}
						json.imgsrc = tempFiles[i].tempFilePath
						arr.push(json)
					}
					console.log(arr)
					if(arr.length>=9){
						console.log("999")
						arr.splice(9)
						that.setData({
							imgxc:arr
						})
					}else{
						that.setData({
							imgxc:arr
						})
					}
					console.log(imgxc)
				}

			}
		})
	},
	//去掉图片
	qxbtn(e){
		let that = this
		let imgxc = that.data.imgxc
		let imgsrc = e.currentTarget.dataset.imgsrc
		for(let i=0;i<imgxc.length;i++){
			if(imgsrc == imgxc[i].imgsrc){
				imgxc.splice([i],1)
				that.setData({
					imgxc:imgxc
				})
			}
		}
		let  currentImgsrc = e.currentTarget.dataset.imgsrc;
		if(currentImgsrc.includes(app.globalData.web_path)){
			currentImgsrc = currentImgsrc.replaceAll(app.globalData.web_path,'');
			// 去除路径
			let originPhotoPath = this.data.originPhotoPath;
			console.log(originPhotoPath);
			originPhotoPath = originPhotoPath.replaceAll(currentImgsrc,'');
			this.setData({
				originPhotoPath:  originPhotoPath.substr(0,originPhotoPath.lastIndexOf(';')),
			});
		}
		console.log(this.data)
	},
	//预览图片
	preimg(e){
		let imgxc = this.data.imgxc
		let arrimg = []
		for(let i = 0;i<imgxc.length;i++){
			arrimg.push(imgxc[i].imgsrc)
		}
		let oimg = e.currentTarget.dataset.src
		wx.previewImage({
			current: oimg, // 当前显示图片的http链接
			urls: arrimg // 需要预览的图片http链接列表
		})
	},
	//保存
	async bc(){
		var that = this;
		// 更新以前 存在的图片 的路径
		modifydata = {
			id: this.data.companyUuid,
			photoPath:this.data.originPhotoPath,
		}
		let modifyPromise = recruitCompanyService.updateRecruitCompany(modifydata);
		modifyPromise.then(
			r => console.log(r)
		).catch(r => console.error(r));
		await modifyPromise;
		// 更新新增图片
		let imgxc = this.data.imgxc
		let arrimg = []
		for(let i = 0;i<imgxc.length;i++){
			if(!imgxc[i].imgsrc.includes(app.globalData.web_path))
				arrimg.push(imgxc[i].imgsrc)
		}
		console.log(arrimg);
		arrimg.forEach(async v =>{
			let uploadPromise = $.upload({
				url: '/recruit-company/uploadPhoto?id=' + that.data.companyUuid,
				filePath: v,
				formData: {},
				name: 'file',
				header: app.globalData.header,
			});
			await uploadPromise.then(r => console.log(r))
			.catch(r=>console.error(r));
		});
		wx.navigateTo({
			url: '/pages/rzcenter/rzcenter' ,
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
		wx.getSystemInfo({
			success: function (res) {
				let imgwd = (res.windowWidth -40 -30)/3;
				let bight = imgwd * 3 +30
				that.setData({
					imgwd:imgwd,
					bight:bight
				})
			}
		});

		// 加载用户信息
		let loadRecruiterPromise = userRecruiterService.loadEntityById(openid);
		loadRecruiterPromise.then((r) => {
			console.log(r);
			that.setData({
				companyUuid: r.data.companyUuid
			})
		}).catch((r) => {
			console.error(r);
		})
		await loadRecruiterPromise;


		
		let loadCompanyPromise = recruitCompanyService.loadEntityById(this.data.companyUuid);
		loadCompanyPromise.then((r) => {
			console.log(r);
			let photoPath_list = 
				string_util.isEmpty(r.data.photoPath)?'': string_util.splitBySemiColon(r.data.photoPath);
			let imgxc_list = []; 
			photoPath_list.forEach(val =>{
				imgxc_list.push({imgsrc: app.globalData.web_path + val});
			});
			that.setData({
				imgxc: imgxc_list,
				originPhotoPath: r.data.photoPath,
			})
		}).catch((r) => {
			console.error(r);
		})
		await loadCompanyPromise;

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