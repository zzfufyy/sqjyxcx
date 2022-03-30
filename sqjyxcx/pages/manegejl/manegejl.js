// pages/manegejob/manegejob.js
const $ = require('../../utils/request_util');
const string_util = require('../../utils/string_util');
const userRecruiterService = require('../../common/userRecruiterService');
const recruitCompanyService = require('../../common/recruitCompanyService');
const recruitRecordService = require('../../common/recruitRecordService');
const date_utils = require('../../utils/date_utils');
const CONSTANT = require('../../common/constant');
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		recruiterOpenid: '',
		companyUuid: '',
		currentId: '0',
		currentTab: '0',
		yhid: "",
		organid: "",
		section: [],
		// 原始数据保存
		dckOrigin: "",
		gtzOrigin: "",
		buheshiOrigin: "",
		dck: [
			{
				date: '3月9日', list: [
					{ name: '张三', sex: '女', year: '24', workyear: '1-3', jyzt: '待业', ypzw: '清洁工', cellphne: '13112345678', ckid: '0' },
					{ name: '张三', sex: '女', year: '24', workyear: '1-3', jyzt: '待业', ypzw: '清洁工', cellphne: '13212345678', ckid: '1' },
					{ name: '张三', sex: '女', year: '24', workyear: '1-3', jyzt: '待业', ypzw: '清洁工', cellphne: '13212345678', ckid: '2' },
				]
			},
			{
				date: '3月10日', list: [
					{ name: '张三', sex: '女', year: '24', workyear: '1-3', jyzt: '待业', ypzw: '清洁工', cellphne: '13112345678', ckid: '3' },
					{ name: '张三', sex: '女', year: '24', workyear: '1-3', jyzt: '待业', ypzw: '清洁工', cellphne: '13212345678', ckid: '4' },
				]
			},

		],
		gtz: [{
			date: '3月9日', list: [
				{ name: '李四', sex: '女', year: '24', workyear: '1-3', jyzt: '待业', ypzw: '清洁工', cellphne: '13112345678', ckid: '2' },
				{ name: '李四', sex: '女', year: '24', workyear: '1-3', jyzt: '待业', ypzw: '清洁工', cellphne: '13212345678', ckid: '3' }]
		}
		],
		buheshi: [
			{ date: '3月9日', list: [{ name: '王五', sex: '女', year: '24', workyear: '1-3', jyzt: '待业', ypzw: '清洁工', cellphne: '13112345678', ckid: '4' }] },
		],
		ident: "company",

		// 弹窗
		sxkz: true,
		// 月薪要求
		salaryList: CONSTANT.salaryList,
		yxyq: [], // min max yxmoney id checked

		index: '',

		// 年龄范围
		ageList: CONSTANT.ageList,
		nyxz: [
			{ nl: '不限', id: 0, checked: true, min: 0, max: 0 }, { nl: '20-30岁', id: 1 }, { nl: '30-40岁', id: 2 }, { nl: '40-50岁', id: 3 }, { nl: '50-60岁', id: 4 },
		],
		// 工作经验
		gzjy: [
			{ jy: '不限', id: 0, checked: true }, { jy: '1-3年', id: 1 }, { jy: '3-5年', id: 2 }, { jy: '5-10年', id: 3 }, { jy: '10年以上', id: 4 },
		],
		hidesx: true
	},
	// 筛选事件
	sx() {
		let hidesx = !this.data.hidesx
		this.setData({
			hidesx: hidesx
		})
	},
	//月薪选择
	yxxz(e) {
		let id = e.currentTarget.dataset.id
		console.log(id)
		let yxyqList = this.data.yxyq;
		yxyqList.forEach((v, i) => {
			v.checked = v.id == id ? true : false
		})
		this.setData({
			yxyq: yxyqList
		})
		console.log(this.data.yxyq);
	},
	//年龄范围
	nlfw(e) {
		let id = e.currentTarget.dataset.id
		console.log(id)
		let nyxzList = this.data.nyxz;
		nyxzList.forEach((v, i) => {
			v.checked = v.id == id ? true : false
		});
		this.setData({
			nyxz: nyxzList
		})
	},
	// //工作经验
	// gzjy(e) {
	// 	let id = e.currentTarget.dataset.id
	// 	console.log(id)
	// 	for (let i = 0; i < this.data.gzjy.length; i++) {
	// 		if (this.data.gzjy[i].id == id) {
	// 			if (this.data.gzjy[i].checked == true) {
	// 				this.data.gzjy[i].checked = false;
	// 			} else {
	// 				this.data.gzjy[i].checked = true;
	// 			}
	// 		}
	// 	}
	// 	this.setData({
	// 		gzjy: this.data.gzjy
	// 	})
	// },
	//清空
	clear() {
		for (let i = 0; i < this.data.yxyq.length; i++) {
			this.data.yxyq[i].checked = false;
		}
		for (let i = 0; i < this.data.nyxz.length; i++) {
			this.data.nyxz[i].checked = false;
		}
		for (let i = 0; i < this.data.gzjy.length; i++) {
			this.data.gzjy[i].checked = false;
		}
		this.setData({
			yxyq: this.data.yxyq,
			nyxz: this.data.nyxz,
			gzjy: this.data.gzjy,
		})
	},
	//确定
	qd() {
		// 获取3个列表
		let dckList = JSON.parse(this.data.dckOrigin);
		let gtzList = JSON.parse(this.data.gtzOrigin);
		let buheshiList = JSON.parse(this.data.buheshiOrigin);
		// 获取月薪要求范围 并过滤
		let yxyqChoosed = this.data.yxyq.filter(v => { return v.checked })[0];
		console.log(yxyqChoosed);
		console.log(this.data);
		switch (yxyqChoosed.id) {
			case 0: break;
			// 3000以下
			case 1: {
				dckList.forEach((v) => {
					v.list = v.list.filter(r => { return r.max <= yxyqChoosed.max })
				})
				gtzList.forEach((v) => {
					v.list = v.list.filter(r => { return r.max <= yxyqChoosed.max })
				})
				buheshiList.forEach((v) => {
					v.list = v.list.filter(r => { return r.max <= yxyqChoosed.max })
				})
				break;
			}
			// 10000以上
			case 5: {
				dckList = dckList.filter((v) => {
					v.list = v.list.filter(r => { return r.min >= yxyqChoosed.min })
				})
				gtzList = gtzList.filter((v, i) => {
					v.list = v.list.filter(r => { return r.min >= yxyqChoosed.min })
				})
				buheshiList = buheshiList.filter((v, i) => {
					v.list = v.list.filter(r => { return r.min >= yxyqChoosed.min })
				})
				break;
			}
			default: {
				dckList.forEach((v, i) => {
					v.list = v.list.filter(r => { return r.min >= yxyqChoosed.min && r.max <= yxyqChoosed.max })
				})
				gtzList.forEach((v, i) => {
					v.list = v.list.filter(r => { return r.min >= yxyqChoosed.min && r.max <= yxyqChoosed.max })
				})
				buheshiList.forEach((v, i) => {
					v.list = v.list.filter(r => { return r.min >= yxyqChoosed.min && r.max <= yxyqChoosed.max })
				})
				break;
			}
		}
		// 获取年龄范围 并过滤
		let nyxzChoosed = this.data.nyxz.filter(v => { return v.checked })[0];
		switch (nyxzChoosed.id) {
			case 0: break;
			default: {
				dckList.forEach((v) => {
					v.list = v.list.filter(r => { return r.year > nyxzChoosed.min && r.year < nyxzChoosed.max });

				});
				gtzList.forEach((v) => {
					v.list = v.list.filter(r => { return r.year > nyxzChoosed.min && r.year < nyxzChoosed.max })
				});
				buheshiList.forEach((v) => {
					v.list = v.list.filter(r => { return r.year > nyxzChoosed.min && r.year < nyxzChoosed.max })
				});
				break;
			}
		}

		// 过滤list为0的
		dckList = dckList.filter(v => { return v.list.length > 0 });
		gtzList = gtzList.filter(v => { return v.list.length > 0 });
		buheshiList = buheshiList.filter(v => { return v.list.length > 0 });
		this.setData({
			dck: dckList,
			gtz: gtzList,
			buheshi: buheshiList,
		})
		// 计算长度
		let dcklen = 0;
		dckList.forEach(v => v.list.forEach(r => dcklen ++ ));
		let gtzlen = 0;
		gtzList.forEach(v => v.list.forEach(r => gtzlen ++ ));
		let buheshilen = 0;
		buheshiList.forEach(v => v.list.forEach(r => buheshilen ++ ));
		let section1 = [
			{ name: '待查看', typeId: '0', num: dcklen },
			{ name: '沟通中', typeId: '1', num: gtzlen },
			{ name: '不合适', typeId: '2', num: buheshilen },
		]
		console.log(this.data);
		let hidesx = !this.data.hidesx
		this.setData({
			hidesx: hidesx,
			section:section1,
		})
	},


	//点击头部导航的点击事件
	handleTap: function (e) {
		let id = e.currentTarget.id;
		if (id) {
			this.setData({
				currentId: id,
				currentTab: id,
			})
		}
	},
	// 滚动切换标签样式 
	switchTab: function (e) {
		// console.log(e) 
		var that = this;
		that.setData({
			currentTab: e.detail.current,
			currentId: e.detail.current
		});
	},
	//聊一聊
	talk() {
		let that = this
		let ident = that.data.ident
		wx.navigateTo({
			url: '/pages/talkjobcom/talkjobcom?userident=' + ident,
		})
	},
	//待查看打电话
	call(e) {
		let that = this
		let phonenum = e.currentTarget.dataset.cellphne
		wx.makePhoneCall({
			phoneNumber: phonenum, //仅为示例，并非真实的电话号码
		})
	},
	//沟通中打电话
	callnum(e) {
		let that = this
		let buheshi = that.data.buheshi
		let phonenum = e.currentTarget.dataset.cellphne
		wx.makePhoneCall({
			phoneNumber: phonenum, //仅为示例，并非真实的电话号码
		})
	},
	//不合适打电话
	bhscall(e) {
		let that = this
		let phonenum = e.currentTarget.dataset.cellphne
		wx.makePhoneCall({
			phoneNumber: phonenum, //仅为示例，并非真实的电话号码
			success(res) {
			}
		})
	},
	//待查看不合适点击事件
	bhs(e) {
		console.log(e.currentTarget);
		// 获取记录id
		let recordUuid = e.currentTarget.dataset.recordUuid;

	},
	//沟通中不合适点击事件
	gtzbhs(e) {

	},
	//待查看聊一聊
	dcktalk(e) {
		let that = this
		let xiajiaid = e.currentTarget.dataset.ckid
		let dck = that.data.dck
		let gtz = that.data.gtz
		let buheshi = that.data.buheshi
		console.log(e)
		for (let i = 0; i < dck.length; i++) {
			if (xiajiaid == dck[i].ckid) {
				wx.showModal({
					title: '提示',
					content: '是否确认沟通',
					success(res) {
						if (res.confirm) {
							console.log("000")

							gtz.push(dck[i])
							dck.splice(i, 1)
							let section1 = [
								{ name: '待查看', typeId: '0', num: dck.length },
								{ name: '沟通中', typeId: '1', num: gtz.length },
								{ name: '不合适', typeId: '2', num: buheshi.length },
							]
							that.setData({
								dck: dck,
								gtz: gtz,
								section: section1
							})
							let ident = that.data.ident
							wx.navigateTo({
								url: '/pages/talkjobcom/talkjobcom?userident=' + ident,
							})

						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})

			}
		}
		let section1 = [
			{ name: '待查看', typeId: '0', num: dck.length },
			{ name: '沟通中', typeId: '1', num: gtz.length },
			{ name: '不合适', typeId: '2', num: buheshi.length },
		]
		that.setData({
			dck: dck,
			buheshi: buheshi,
			section: section1
		})
	},
	//不合适聊一聊
	bhstalk(e) {
		let that = this
		let xiajiaid = e.currentTarget.dataset.ckid
		let dck = that.data.dck
		let gtz = that.data.gtz
		let buheshi = that.data.buheshi
		for (let i = 0; i < buheshi.length; i++) {
			if (xiajiaid == buheshi[i].ckid) {
				wx.showModal({
					title: '提示',
					content: '是否确认沟通',
					success(res) {
						if (res.confirm) {
							gtz.push(buheshi[i])
							buheshi.splice(i, 1)
							let section1 = [
								{ name: '待查看', typeId: '0', num: dck.length },
								{ name: '沟通中', typeId: '1', num: gtz.length },
								{ name: '不合适', typeId: '2', num: buheshi.length },
							]
							that.setData({
								buheshi: buheshi,
								gtz: gtz,
								section: section1
							})
							let ident = that.data.ident
							wx.navigateTo({
								url: '/pages/talkjobcom/talkjobcom?userident=' + ident,
							})
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			}

		}
		let section1 = [
			{ name: '待查看', typeId: '0', num: dck.length },
			{ name: '沟通中', typeId: '1', num: gtz.length },
			{ name: '不合适', typeId: '2', num: buheshi.length },
		]
		that.setData({
			gtz: gtz,
			buheshi: buheshi,
			section: section1
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		let that = this;
		// openid
		await app.getOpenidReady();
		let openid = wx.getStorageSync('openid');
		// 根据openid 加载 招聘人信息
		let loadRecruiterPromise = userRecruiterService.loadEntityById(openid);
		await loadRecruiterPromise.then(r => {
			that.setData({
				recruiterOpenid: openid,
				companyUuid: r.data.companyUuid,
			})
		}).catch(r =>
			console.error(r)
		)
		// 根据compnayUuid加载求职简历信息
		// 初步处理list
		let listInit = []
		// list初始化
		let listDck = []; let listGtz = []; listBuheshi = [];
		let loadRecordPromise = recruitRecordService.listRecordPlusByCompanyUuid(this.data.companyUuid);
		await loadRecordPromise.then(r => {
			console.log(r.data);
			r.data.forEach((v,i) => {
				console.log(date_utils.dateToCN(v.createTime));
				let tempData = {
					recordUuid: v.recordUuid,
					date: date_utils.dateToCN(v.createTime),
					name: v.realName,
					sex: CONSTANT.genderList[v.gender],
					year: date_utils.getAgeByBirthday(v.birthday),
					ypzw: v.jobName,
					cellphne: v.telephone,
					flowRecruit: v.flowRecruit,
					min: v.jobSalaryMin,
					max: v.jobSalaryMax,
					ckid:i,
				}
				switch (tempData.flowRecruit) {
					case CONSTANT.FLOW_RECRUIT.NORMAL:
						listDck.push(tempData); break;
					case CONSTANT.FLOW_RECRUIT.PROCESSING:
						listGtz.push(tempData); break;
					case CONSTANT.FLOW_RECRUIT.UNSUITABLE:
						listBuheshi.push(tempData); break;
				}
				listInit.push(tempData);
			})
			// 加载数据
		}).catch(r => {
			console.error(r);
		})
		console.log(listDck);
		this.buildList(listDck, listGtz, listBuheshi);
		// 保存初始数据
		temp1 = JSON.stringify(this.data.dck);
		temp2 = JSON.stringify(this.data.gtz);
		temp3 = JSON.stringify(this.data.buheshi);
		this.setData({
			dckOrigin: temp1,
			gtzOrigin: temp2,
			buheshiOrigin: temp3,
		})

		// 搜索栏构建月薪要求
		let yxyqList = [];
		CONSTANT.salaryList.forEach((val, i) => {
			let checked = i == 0 ? true : false;
			yxyqList.push({
				yxmoney: val.value,
				id: i,
				checked: checked,
				min: val.min,
				max: val.max,
			})
		})
		this.setData({
			yxyq: yxyqList,
		});
		// 搜索栏构建年龄限制 { nl: '不限', id: 0, checked: true },
		let nyxzList = [];
		CONSTANT.ageList.forEach((val, i) => {
			let checked = i == 0 ? true : false;
			nyxzList.push({
				nl: val.value,
				id: i,
				checked: checked,
				min: val.min,
				max: val.max,
			})
		})
		this.setData({ nyxz: nyxzList });
	},
	

	// 函数 构建list
	buildList: function (listDck, listGtz, listBuheshi) {
		let that = this;
		let dckTemp = []; let gtzTemp = []; buheshiTemp = [];
		// 构建dck
		let date = '';
		let tempData = { date: '', list: [], };
		if (listDck.length != 0) {
			listDck.forEach((r, i, arr) => {
				if (date != r.date) {
					if (tempData.list.length != 0) {
						dckTemp.push(tempData);
					}
					tempData = { date: r.date, list: [], }
				}
				tempData.list.push({
					recordUuid: r.recordUuid,
					name: r.name,
					sex: r.gender,
					year: r.year,
					ypzw: r.ypzw,
					cellphne: r.cellphne,
					flowRecruit: r.flowRecruit,
					min: r.min,
					max: r.max,
					ckid: r.ckid,
				})
				date = r.date;
				if (i == (arr.length - 1)) {
					dckTemp.push(tempData);
				}
			});
		}
		// 构建gtz
		date = '';
		tempData = { date: '', list: [], };
		if (listGtz.length != 0) {
			listGtz.forEach((r, i, arr) => {
				if (date != r.date) {
					if (tempData.list.length != 0) {
						gtzTemp.push(tempData);
					}
					tempData = { date: r.date, list: [], }
				}
				tempData.list.push({
					recordUuid: r.recordUuid,
					name: r.name,
					sex: r.gender,
					year: r.year,
					ypzw: r.ypzw,
					cellphne: r.cellphne,
					flowRecruit: r.flowRecruit,
					min: r.min,
					max: r.max,
					ckid: r.ckid,
				})
				date = r.date;
				if (i == (arr.length - 1)) {
					gtzTemp.push(tempData);
				}
			});
		}
		// 构建buheshi
		date = '';
		tempData = { date: '', list: [], };
		if (listBuheshi.length != 0) {
			listBuheshi.forEach((r, i, arr) => {
				if (date != r.date) {
					if (tempData.list.length != 0) {
						buheshiTemp.push(tempData);
					}
					tempData = { date: r.date, list: [], }
				}
				tempData.list.push({
					recordUuid: r.recordUuid,
					name: r.name,
					sex: r.gender,
					year: r.year,
					ypzw: r.ypzw,
					cellphne: r.cellphne,
					flowRecruit: r.flowRecruit,
					min: r.min,
					max: r.max,
					ckid: r.ckid,
				})
				date = r.date;
				if (i == (arr.length - 1)) {
					buheshiTemp.push(tempData);
				}
			});
		}
		this.setData({
			dck: dckTemp,
			gtz: gtzTemp,
			buheshi: buheshiTemp,
		})
		console.log(dckTemp);
		wx.getSystemInfo({
			success: function (res) {
				that.setData({
					winWidth: res.windowWidth,
					winHeight: res.windowHeight,
				});
			}
		})
		let dck = 0
		let gtz = 0
		let buheshi = 0
		for (let i = 0; i < that.data.dck.length; i++) {
			dck += that.data.dck[i].list.length
		}
		for (let q = 0; q < that.data.gtz.length; q++) {
			gtz += that.data.gtz[q].list.length
		}
		for (let w = 0; w < that.data.buheshi.length; w++) {
			buheshi += that.data.buheshi[w].list.length
		}


		let section1 = [
			{ name: '待查看', typeId: '0', num: dck },
			{ name: '沟通中', typeId: '1', num: gtz },
			{ name: '不合适', typeId: '2', num: buheshi },
		]
		that.setData({
			section: section1
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