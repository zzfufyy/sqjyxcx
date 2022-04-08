// pages/wantjob/wantjob.js
const { UserService } = require('../../service/user_service');
const { Category } = require('../../service/job_category');
const { Salary } = require('../../common/constant');
const { GlobalKey } = require('../../service/global_service');

const CONSTANT = require('../../common/constant');
const Loading = require('../../utils/loading_util');
const object_util = require('../../utils/object_util');
// 加载服务
const jobCategoryService = require('../../common/jobCategoryService');
const candidateForCategoryService = require('../../common/candidateForCategoryService');
const candidateForCommunityService = require('../../common/candidateForCommunityService');
const communityInformationService = require('../../common/communityInformationService');
const userCandidateService = require('../../common/userCandidateService');
const string_util = require('../../utils/string_util');


const app = getApp();
const MAX_CHOOSE_CATEGORY_NUM = 3;
const MAX_CHOOSE_COMMUNITY_NUM = 3;

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		qwzw: '请输入期望职位',
		// 保存 初始wantjob 副本
		wantjobCopy: [],
		wantjob: [
			{ job: 'IT', id: 0, checked: false, display: 'none' },
			{ job: '文化传媒', id: 1 },
			{ job: '电子制造', id: 2 },
			{ job: '机械制造', id: 3 },
			{ job: '美容美发', id: 4 }
		],
		csjobCopy: [],
		csjob: [
			// { job: 'IT', id: 0, checked: false, display: 'none' },
		],
		hiddenPopupExpectCategory: true,
		jobzwei: '',
		// 保存点击的下方热门职位
		// 期望职位列表
		arrtag: [],

		txthide: false,
		arrhide: true,

		// 期望薪资
		salaryStringList: [],
		salaryList: [],
		index: '0',

		sjLeftItems: [
			{ typename: '芙蓉区', typeid: 0 },
			{ typename: '天心区', typeid: 1 },
			{ typename: '岳麓区', typeid: 2 },
			{ typename: '开福区', typeid: 3 },
			{ typename: '雨花区', typeid: 4 },
			{ typename: '望城区', typeid: 5 },
		],
		sjRightItemsCopy: [],
		sjRightItems: [
			{ typename: '芙蓉区', typelist: [{ childname: '街道一', id: 0 }, { childname: '街道2', id: 1 }, { childname: '街道1', id: 2 }], typeid: 0 },
			{ typename: '天心区', typelist: [{ childname: '街道一', id: 3 }, { childname: '街道2', id: 4 }, { childname: '街道1', id: 5 }], typeid: 1 },
			{ typename: '岳麓区', typelist: [{ childname: '街道一', id: 6 }, { childname: '街道2', id: 7 }, { childname: '街道1', id: 8 }], typeid: 2 },
			{ typename: '开福区', typelist: [{ childname: '街道一', id: 9 }, { childname: '街道2', id: 10 }, { childname: '街道1', id: 11 }], typeid: 3 },
			{ typename: '雨花区', typelist: [{ childname: '街道一', id: 12 }, { childname: '街道2', id: 13 }, { childname: '街道1', id: 14 }], typeid: 4 },
			{ typename: '望城区', typelist: [{ childname: '街道一', id: 15 }, { childname: '街道2', id: 16 }, { childname: '街道1', id: 17 }], typeid: 5 },
		],
		// 已选社区
		nulllocalCopy: [],
		nulllocal: [],

		curNav: 1,
		id: 1,
		currentId: '2',
		oht: '',

		qzlocal: true,
		qzqxlocal: true,
		qzqutxt: false,
		qzqumess: true,

		qzlocalist: [],

	},

	//输入职位
	inputjob(e) {
		console.log(e.detail.value);
		var that = this;

		let searchText = e.detail.value;
		let wantjobCopyTemp = object_util.copyObject(this.data.wantjobCopy);
		if (string_util.isEmpty(searchText)) {
			this.setData({
				wantjob: wantjobCopyTemp,
			})
		} else {
			// 遍历查找是否包含字符串
			let wantjobList = wantjobCopyTemp.map(v => {
				if (v.job.indexOf(searchText) == -1) {
					v.display = "none";
				}
				return v;
			});
			this.setData({
				wantjob: wantjobList,
			})
		}
	},


	// 弹窗 职位意向选择
	bindtapPopupExpectCategory() {
		// 每次进来先制作副本保存
		this.setData({
			hiddenPopupExpectCategory: false,
			wantjobCopy: object_util.copyObject(this.data.wantjob),
			csjobCopy: object_util.copyObject(this.data.csjob),
		})
	},
	// 选择职位 到已选择
	bindtapChooseCategory(e) {
		let currentId = e.currentTarget.dataset.id;
		let wantjobList = this.data.wantjob;
		let csjobList = this.data.csjob;

		if (csjobList.length >= MAX_CHOOSE_CATEGORY_NUM) {
			wx.showModal({
				title: '提示',
				content: '最多选择三个职业',
			})
			return;
		}
		// 更新待选择职位列表
		wantjobList = wantjobList.map(v => {
			if (v.id == currentId) {
				v.checked = true;
				v.display = 'none';
			}
			return v;
		});
		// 更新已选择职位列表
		let currentObj = object_util.copyObject(
			wantjobList.find(v => {
				return v.id == currentId;
			})
		);
		currentObj.display = 'block';
		csjobList.push(currentObj);
		this.setData({
			wantjob: wantjobList,
			csjob: csjobList,
		})
		console.log(this.data);

	},
	// 移除已选择职位 到待选择职位列表
	bindtapRemoveCategory(e) {
		let currentId = e.currentTarget.dataset.id;
		let wantjobList = this.data.wantjob;
		let csjobList = this.data.csjob;
		// 更新已选择职位列表
		let currentIndex = csjobList.findIndex(v => {
			return v.id == currentId;
		});
		csjobList.splice(currentIndex, 1);
		// 更新待选择职位列表
		wantjobList = wantjobList.map(v => {
			if (v.id == currentId) {
				v.checked = false;
				v.display = 'block';
			}
			return v;
		})
		this.setData({
			wantjob: wantjobList,
			csjob: csjobList,
		})
	},
	// 职位搜索框  回车按键
	async bindconfirmSeachCategory(e) {

		var that = this;
		let searchText = e.detail.value;
		let wantjobList = this.data.wantjob;

		let wantjobCopyTemp = object_util.copyObject(this.data.wantjobCopy);
		// 如果字符串为空不作处理
		if (string_util.isEmpty(searchText)) {
			this.setData({
				wantjob: wantjobCopyTemp,
			})
			return;
		}
		// 查找是否存在
		if (wantjobList.findIndex(r => {
			return r.job.indexOf(searchText) != -1;
		}) != -1) {
			let wantjobList = wantjobCopyTemp.map(v => {
				if (v.job.indexOf(searchText) == -1) {
					v.display = "none";
				}
				return v;
			});
			this.setData({
				wantjob: wantjobList,
			})
		}else{
			insertData = {
				categoryName : searchText,
			}
			// 不存在就插入  
			let categoryUuidData = await jobCategoryService.insertByEntity(insertData);
			let categoryUuid = categoryUuidData.data;
			let newWantJobData = {
				id: categoryUuid,
				job: searchText,
				checked: false,
				display: 'block',
			}
			wantjobList.push(newWantJobData);
			wantjobCopyTemp.push(newWantJobData);
			this.setData({
				wantjob: wantjobList,
				wantjobCopy: object_util.copyObject(wantjobCopyTemp),
			})
		}


	},
	// 取消弹窗 职位意向选择
	bindtapCategoryCancel() {
		// 副本还原
		let currentWantjobCopy = this.data.wantjobCopy;
		let currentCsjobCopy = this.data.csjobCopy;
		this.setData({
			hiddenPopupExpectCategory: true,
			wantjob: currentWantjobCopy,
			csjob: currentCsjobCopy,
		})
	},
	// 保存 -- 职位意向选择 
	bindtapCategorySave() {
		let wantjobListCopy = this.data.wantjobCopy;
		let wantjobList = this.data.wantjob;
		let arrhide; let txthide;
		if (wantjobList.findIndex(r => {
			return r.checked == true;
		}) == -1) {
			txthide = false;
			arrhide = true;
		} else {
			txthide = true;
			arrhide = false;
		}
		wantjobList = wantjobList.map(v =>{
			v.display = v.checked == false? 'block':'none';
			return v;
		})
		this.setData({
			wantjob: object_util.copyObject(wantjobList),
			hiddenPopupExpectCategory: true,
			txthide: txthide,
			arrhide: arrhide
		});
	},


	//薪资选择
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
	bindtapChooseCommunity(e) {

		let currentId = e.currentTarget.dataset.id;
		let sjRightItemsList = this.data.sjRightItems
		let nulllocalList = this.data.nulllocal
		// 获取选择的 父子index
		let parentIndex; let childIndex
		sjRightItemsList.forEach((r, i) => {
			let tempIndex = r.typelist.findIndex(v => {
				return currentId == v.id;
			});
			if (tempIndex != -1) {
				parentIndex = i;
				childIndex = tempIndex;
			}
		});
		// 左侧
		let currentObj = object_util.copyObject(sjRightItemsList[parentIndex].typelist[childIndex]);

		if (currentObj.checked == false) {
			// 不得超过3个
			if (nulllocalList.length >= MAX_CHOOSE_COMMUNITY_NUM) {
				wx.showModal({
					title: '提示',
					content: '最多选择三个区域',
				})
				return;
			} else {
				sjRightItemsList[parentIndex].typelist[childIndex].checked = true;
				// 加入到list中
				nulllocalList.push({
					id: currentObj.id,
					local: currentObj.childname,
				});
			}
		} else {
			sjRightItemsList[parentIndex].typelist[childIndex].checked = false;
			// 从list中移除
			nulllocalList.splice(nulllocalList.findIndex(v => {
				return v.id == currentId;
			}), 1);
		}
		this.setData({
			sjRightItems: sjRightItemsList,
			nulllocal: nulllocalList,
		});
	},
	// 弹窗 - 求职区域呼出
	bindtapPopupExpectCommunity() {
		// 建立副本
		this.setData({
			nulllocalCopy: object_util.copyObject(this.data.nulllocal),
			sjRightItemsCopy: object_util.copyObject(this.data.sjRightItems),
			qzlocal: false,
			qzqxlocal: false,
		})
	},
	// 求职区域保存
	bindtapCommunitySave() {
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
	bindtapCommunityMask() {
		this.setData({
			nulllocal: this.data.nulllocalCopy,
			sjRightItems: this.data.sjRightItemsCopy,
			qzlocal: true,
			qzqxlocal: true
		})
	},


	// 全部保存事件
	bc: async function () {
		// 求职用户openid
		let candidateOpenid = this.data.candidateOpenid;
		let csjobList = this.data.csjob;
		let currentSalary = this.data.salaryList[this.data.index];
		let nulllocalList = this.data.nulllocal;
		console.log(this.data);
		try {
			Loading.begin();
			// 构建 更新用户数据
			let updateCandidateData = {
				id: candidateOpenid,
				expectSalaryMin: currentSalary.min,
				expectSalaryMax: currentSalary.max,
			}
			await userCandidateService.updateByEntity(updateCandidateData);
			// 构建 插入 期望职位数据
			let insertExpectCategoryList = [];
			csjobList.forEach(v => {
				insertExpectCategoryList.push({
					candidateOpenid: candidateOpenid,
					categoryUuid: v.id,
					categoryName: v.job,
				})
			});
			await candidateForCategoryService.insertByEntityList(candidateOpenid, insertExpectCategoryList);
			// 构建 插入 期望社区数据
			let insertExpectCommunityList = [];
			nulllocalList.forEach(v => {
				insertExpectCommunityList.push({
					candidateOpenid: candidateOpenid,
					communityUuid: v.id,
					communityName: v.local,
				})
			})
			await candidateForCommunityService.insertByEntityList(candidateOpenid, insertExpectCommunityList);

		} catch (e) {
			console.error(e);
		} finally {
			Loading.end();
		}
		wx.navigateBack({
			delta: 0,
		});
	},


	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		// 初始化加载开始
		Loading.begin();
		var that = this
		// 加载openid
		await app.getOpenidReady();
		let openid = wx.getStorageSync('openid');
		this.setData({
			candidateOpenid: openid,
		})
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
		// 页面数据加载
		this._reloadData();
		// 初始化加载结束
		Loading.end();
	},
	onUnload: function () {

	},

	// 加载用户
	_reloadData: async function () {
		let that = this;
		await app.getOpenidReady();
		let openid = wx.getStorageSync('openid');
		try {
			// 加载职位列表
			let wantjobList = [];
			// 13个热门职位
			let loadCategoryPromise = jobCategoryService.loadList();
			await loadCategoryPromise.then(r => {
				wantjobList = r.data.map(v => {
					return {
						job: v.categoryName,
						id: v.id,
						checked: false,
						display: 'block',
					}
				})
			}).catch(r => {
				console.error(r);
			})
			// 加载求职者用户信息
			let recruiteeInfo = await UserService.loadRcruiteeInfo();

			// 加载求职者 - 期望职位
			let candidateForCategoryResult = await candidateForCategoryService.loadListByCandidateOpenid(openid);
			console.log("加载求职者openid：" + openid + " 的求职期望列表：");
			console.log(candidateForCategoryResult)
			// 
			let expectJobCategoryList = candidateForCategoryResult.data.map(r => {
				return {
					job: r.categoryName,
					id: r.categoryUuid,
					checked: true,
					display: 'none',
				}
			})
			console.log(expectJobCategoryList)
			//去重
			wantjobList = wantjobList.filter(r => {

				if (expectJobCategoryList.findIndex(v => {
					return r.id == v.id
				}) == -1) {
					return true;
				}
			})
			// 拼接数组
			wantjobList = wantjobList.concat(expectJobCategoryList);
			console.log(wantjobList);
			let noCheckedNum = 0;
			wantjobList = wantjobList.filter(v => {
				if (v.checked == false) {
					noCheckedNum += 1;
				}
				return v.checked == true || noCheckedNum <= 10;
			});
			console.log(wantjobList);


			// 默认请选择文字是否显示
			let arrhide; let txthide;
			if (wantjobList.findIndex(r => {
				return r.checked == true;
			}) == -1) {
				txthide = false;
				arrhide = true;
			} else {
				txthide = true;
				arrhide = false;
			}
			// 需要设置display为 block
			let csjobList = object_util.copyObject(
				wantjobList.filter(v => {
					return v.checked == true;
				})
			)
			csjobList = csjobList.map(v => {
				v.display = 'block';
				return v;
			})
			console.log(csjobList);
			this.setData({
				txthide: txthide,
				arrhide: arrhide,
				wantjob: wantjobList,
				csjob: csjobList,
			})
			console.log(this.data.wantjob);

			// 加载求职者 - 薪资期望  及 薪资可选列表
			let salaryIndex = CONSTANT.salaryList.findIndex((r, i) => {
				return (r.min == recruiteeInfo.expectSalaryMin && r.max == recruiteeInfo.expectSalaryMax)
			});
			console.log(salaryIndex);
			this.setData({
				salaryStringList: CONSTANT.salaryList.map(e => e.value),
				salaryList: CONSTANT.salaryList,
				index: salaryIndex,
			});

			// 加载求职者期望社区列表
			let candidateForCommunityResult = await candidateForCommunityService.loadListByCandidateOpenid(openid);

			// 遍历加载求职者已存在的
			let expectCommunityList = candidateForCommunityResult.data.map(r => {
				return r.communityUuid;
			});
			let qzqumess; let qzqutxt;
			if (expectCommunityList.length == 0) {
				qzqutxt = false;
				qzqumess = true;
			} else {
				qzqutxt = true;
				qzqumess = false;
			}

			// 加载所有社区列表
			let communityInformationListResult = await communityInformationService.loadList();
			let communityInformationList = communityInformationListResult.data;

			console.log(communityInformationList)


			// 加载所有社区的列表
			let districtList = communityInformationList.map(v => {
				return v.districtName;
			});
			// 去重
			districtList = Array.from(new Set(districtList));
			let sjLeftItemsList = [];
			let sjRightItemsList = [];
			sjLeftItemsList = districtList.map((v, i) => {
				return {
					typeid: i,
					typename: v,
				}
			});
			// 初始化社区 列表 和其选择
			let nullLocalist = [];
			sjLeftItemsList.forEach(r => {
				let typelist = [];
				communityInformationList.forEach(v => {
					if (r.typename == v.districtName) {

						typelist.push({
							childname: v.communityName,
							id: v.id,
							checked: false,
						});
						let checked = expectCommunityList.includes(v.id) ? true : false;
						if (checked) {
							typelist[typelist.length - 1].checked = true;
							nullLocalist.push({
								local: v.communityName,
								id: v.id,
							})

						}
					}
				});
				sjRightItemsList.push({
					typename: r.typename,
					typeid: r.typeid,
					typelist: typelist,


				})
			})
			this.setData({
				sjLeftItems: sjLeftItemsList,
				sjRightItems: sjRightItemsList,
				nulllocal: nullLocalist,
				qzqutxt: qzqutxt,
				qzqumess: qzqumess,
			})
		} finally {
		}
	},


})