// pages/wantjob/wantjob.js


const { UserService } = require('../../service/user_service');
const { Salary } = require('../../common/constant');
const { GlobalKey } = require('../../service/global_service');


const Constant = require('../../common/constant');
const Loading = require('../../utils/loading_util');


const app = getApp();

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		qwzw: '请输入期望职位',
		wantjob: [
			{ job: 'IT', id: 0 }, { job: '文化传媒', id: 1 }, { job: '电子制造', id: 2 }, { job: '机械制造', id: 3 }, { job: '美容美发', id: 4 }
		],
		csjob: [],
		qzyx: true,
		jobzwei: '',
		// 保存点击的下方热门职位
		arrtag: [],
		txthide: false,
		arrhide: true,
		// 期望薪资
		salaryStringList: Constant.salaryList.map(e => e.value),
		salaryList: Constant.salaryList,
		index: '0',

		sjLeftItems: [
			{ typename: '芙蓉区', typeid: 0 },
			{ typename: '天心区', typeid: 1 },
			{ typename: '岳麓区', typeid: 2 },
			{ typename: '开福区', typeid: 3 },
			{ typename: '雨花区', typeid: 4 },
			{ typename: '望城区', typeid: 5 },
		],
		sjRightItems: [
			{ typename: '芙蓉区', typelist: [{ childname: '街道一', id: 0 }, { childname: '街道2', id: 1 }, { childname: '街道1', id: 2 }], typeid: 0 },
			{ typename: '天心区', typelist: [{ childname: '街道一', id: 3 }, { childname: '街道2', id: 4 }, { childname: '街道1', id: 5 }], typeid: 1 },
			{ typename: '岳麓区', typelist: [{ childname: '街道一', id: 6 }, { childname: '街道2', id: 7 }, { childname: '街道1', id: 8 }], typeid: 2 },
			{ typename: '开福区', typelist: [{ childname: '街道一', id: 9 }, { childname: '街道2', id: 10 }, { childname: '街道1', id: 11 }], typeid: 3 },
			{ typename: '雨花区', typelist: [{ childname: '街道一', id: 12 }, { childname: '街道2', id: 13 }, { childname: '街道1', id: 14 }], typeid: 4 },
			{ typename: '望城区', typelist: [{ childname: '街道一', id: 15 }, { childname: '街道2', id: 16 }, { childname: '街道1', id: 17 }], typeid: 5 },
		],
		curNav: 1,
		id: 1,
		currentId: '2',
		oht: '',
		nulllocal: [],

		qzlocal: true,
		qzqxlocal: true,
		qzqutxt: false,
		qzqumess: true,

		qzlocalist: [],

	},
	// 点击唤出意向弹框
	qwzw() {
		this.setData({
			qzyx: false,
		})
	},
	//输入职位
	inputjob(e) {
		// console.log(e.detail.value)
		// arrtag.concat(arr)
		// let newarr = [
		// 	{job:'UI',id:5},{job:'Java',id:6},
		// ]
		// let arrtag = this.data.arrtag
		// let wantjob = this.data.wantjob
		// let newarrtag = arrtag.concat(newarr)
		// this.setData({
		// 	wantjob:newarrtag
		// })
	},
	//输入职位后点击键盘右下角完成
	confrim(e) {
		console.log(e.detail.value)
		let wantjob = this.setData.wantjob
		let arrtag = this.data.arrtag
		let arr = []
		arr.push(e.detail.value)
		// let oarr = arrtag.concat(arr)
		// this.setData({
		// 	wantjob:arrtag.concat(arr)
		// })
		// console.log(arr)
	},
	// 保存按钮按钮
	baocun() {
		let arrtag = this.data.arrtag
		if (arrtag.length <= 0) {
			console.log("000")
			let txthide = this.data.txthide
			let arrhide = this.data.arrhide
			this.setData({
				qzyx: true,
				txthide: false,
				arrhide: true
			})
		} else {
			this.setData({
				qzyx: true,
				arrhide: false,
				txthide: true,
			})
		}
	},
	// 取消按钮按钮
	quxiaozzc() {
		this.setData({
			qzyx: true,
			arrhide: true,
			txthide: false,
		})
	},
	// 选择标签
	wantjob(e) {
		let id = e.currentTarget.dataset.id
		let job = e.currentTarget.dataset.job
		let arrtag = this.data.arrtag
		console.log(e)
		for (let i = 0; i < this.data.wantjob.length; i++) {
			if (this.data.wantjob[i].id == id) {
				if (this.data.wantjob[i].checked == true) {
					this.data.wantjob[i].checked = false;
					for (let o = 0; o < arrtag.length; o++) {
						if (this.data.wantjob[i].job == arrtag[o].job) {
							arrtag.splice(o, 1)

							this.setData({
								arrtag: arrtag,
								csjob: arrtag
							})
							// if(arrtag.length <= 1){
							// 	console.log("000")
							// 	wx.showModal({
							// 		title: '提示',
							// 		content: '请最少选择一个标签',
							// 		success (res) {
							// 			if (res.confirm) {
							// 				console.log('用户点击确定')
							// 			} else if (res.cancel) {
							// 				console.log('用户点击取消')
							// 			}
							// 		}
							// 	})
							// }else{
							// 	arrtag.splice(o,1)
							// 	this.data.wantjob[i].checked = false;

							// }
						}
					}
				} else {
					this.data.wantjob[i].checked = true;
					this.data.wantjob[i].display = 'none';
					let json = {}
					json.job = this.data.wantjob[i].job
					json.id = this.data.wantjob[i].id
					json.active = "active"
					arrtag.push(json)

					this.setData({
						arrtag: arrtag,
						csjob: arrtag
					})
					console.log(arrtag)

				}
			}
		}

		this.setData({
			wantjob: this.data.wantjob,
			arrtag: arrtag,
			msg: "id:" + id
		})
		// console.log(arrtag)


	},
	//已选择职业
	haschoosejob(e) {
		let id = e.currentTarget.dataset.id
		let job = e.currentTarget.dataset.job
		let arrtag = this.data.arrtag
		console.log(e)
		for (let i = 0; i < this.data.wantjob.length; i++) {
			if (this.data.wantjob[i].id == id) {
				if (this.data.wantjob[i].checked == true) {
					this.data.wantjob[i].checked = false;
					this.data.wantjob[i].display = 'block';
					for (let o = 0; o < arrtag.length; o++) {
						if (this.data.wantjob[i].job == arrtag[o].job) {
							arrtag.splice(o, 1)
							this.setData({
								arrtag: arrtag,
								csjob: arrtag
							})
						}
					}
				} else {
					this.data.wantjob[i].checked = true;
					this.data.wantjob[i].display = 'block';

					let json = {}
					json.job = this.data.wantjob[i].job
					json.id = this.data.wantjob[i].id
					json.active = "active"
					arrtag.push(json)
					this.setData({
						arrtag: arrtag,
						csjob: arrtag
					})
					console.log(arrtag)
				}
			}
		}
		this.setData({
			wantjob: this.data.wantjob,
			arrtag: arrtag,
			msg: "id:" + id
		})
	},
	//期望薪资
	bindPickerChange: function (e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			index: e.detail.value
		})
	},
	// 期望求职区域--左边区选择
	switchRightTab1: function (e) {
		// 获取item项的id，和数组的下标值
		let id = e.target.dataset.id;
		console.log(e)
		let index = parseInt(e.target.dataset.index1);
		// 把点击到的某一项，设为当前index
		this.setData({
			curNav1: id,
			curIndex1: index,
			toView1: id
		})
	},
	// 期望求职区域--右边街道选择
	choselocal(e) {
		let sjRightItems = this.data.sjRightItems
		let nulllocal = this.data.nulllocal
		let id = e.currentTarget.dataset.id
		for (let i = 0; i < this.data.sjRightItems.length; i++) {
			// console.log(this.data.sjRightItems[i].typelist[0].id)
			for (let q = 0; q < this.data.sjRightItems[i].typelist.length; q++) {
				if (this.data.sjRightItems[i].typelist[q].id == id) {
					if (this.data.sjRightItems[i].typelist[q].checked == true) {
						this.data.sjRightItems[i].typelist[q].checked = false;
						for (let o = 0; o < nulllocal.length; o++) {
							if (this.data.nulllocal[0].id == nulllocal[o].id) {
								nulllocal.splice(o, 1)
								console.log(nulllocal)
							}
						}

					} else {

						if (nulllocal.length >= 3) {
							wx.showModal({
								title: '提示',
								content: '最多选择三个区域',
								success(res) {
									if (res.confirm) {
										console.log('用户点击确定')
									} else if (res.cancel) {
										console.log('用户点击取消')
									}
								}
							})
						} else {
							this.data.sjRightItems[i].typelist[q].checked = true;
							let json = {}
							json.local = this.data.sjRightItems[i].typelist[q].childname
							json.id = this.data.sjRightItems[i].typelist[q].id
							json.active = "active"
							nulllocal.push(json)
							this.setData({
								nulllocal: nulllocal
							})
						}


						console.log(nulllocal)
					}
				}
			}

		}
		this.setData({
			sjRightItems: this.data.sjRightItems,
			nulllocal: nulllocal
		})
		// console.log(arrtag)

	},
	// 求职区域呼出
	qzqubtn() {
		this.setData({
			qzlocal: false,
			qzqxlocal: false,
		})
	},
	// 求职区域保存
	zwbc() {
		let qzlocalist = this.data.qzlocalist
		let nulllocal = this.data.nulllocal
		if (nulllocal.length <= 0) {
			this.setData({
				qzlocal: true,
				qzqxlocal: true,
				qzqutxt: false,
				qzqumess: true,
				qzlocalist: nulllocal
			})
		} else {
			this.setData({
				qzlocal: true,
				qzqxlocal: true,
				qzqutxt: true,
				qzqumess: false,
				qzlocalist: nulllocal
			})
		}
	},
	//点击遮罩层关闭弹窗
	gb() {
		this.setData({
			qzlocal: true,
			qzqxlocal: true
		})
	},
	//保存
	bc: async function () {
		let salary = this.data.salaryList[
			this.data.index
		];

		await UserService.saveRecruiteeInfo({
			expectSalaryMin: salary.min,
			expectSalaryMax: salary.max,
		});

		app.getGlobal(GlobalKey.UserInfoChanged).notifyListeners();

		wx.navigateTo({
			url: '/pages/personjl/personjl',
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this
		wx.getSystemInfo({
			success: (res) => {
				console.log(res)
				let windowHeight = res.windowHeight;
				let wht = windowHeight * 0.8 - 86
				let oht = wht;
				that.setData({
					oht: oht
				})
			},
		});

		this._reloadData();
	},

	onUnload: function () {

	},


	_reloadData: async function (params) {

		await app.getOpenidReady();

		try {
			Loading.begin();

			let recruiteeInfo = await UserService.loadRcruiteeInfo();
			let i = this._dummySalary(
				recruiteeInfo.expectSalaryMin,
				recruiteeInfo.expectSalaryMax,
			);

			console.log(this.data.salaryList);
			this.setData({
				index: i,
			});
		} finally {
			Loading.end();
		}
	},

	/**
	 * 这里采用一个折中的方式来显示薪资
	 * 即，如果有未知的薪资范围值，则添加到已有的列表中显示
	 */
	_dummySalary(min, max) {
		let salaryList = this.data.salaryList;
		let len = salaryList.length;
		for (let i = 0; i < len; i += 1) {
			let si = salaryList[i];
			if (si.min == min && si.max == max) {
				return i;
			}
		}

		let salary = new Salary(min, max).value;

		this.setData({
			salaryList: salaryList.concat(Salary),
			salaryStringList: this.data.salaryStringList.concat(salary.value),
		});

		return len;
	}
})