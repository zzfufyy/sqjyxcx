// index.js
const { GlobalKey } = require('../../service/global_service');

// 求职者模块
const recruitee = require('./recruitee');
// 招聘者模块
const recruiter = require('./recruiter');
// 启动引导模块（引导用户授权、选择角色、注册角色等）
const bootstrap = require('./bootstrap');
// 内容加载模块
const content = require('./content');


// 获取应用实例
const app = getApp();
Page({
  data: {
    ...recruitee.createRecruiteeInfo(),
    topnav: [
      { name: '投递记录', imsrc: '/img/tdjl.png', url: '' },
      { name: '个人简历', imsrc: '/img/grjl.png', url: '' },
      { name: '邀约面试', imsrc: '/img/yyms.png', url: '' },
      { name: '修改定位', imsrc: '/img/xgdw.png', url: '' },
    ],
    //判断用户是求职者还是企业  user/company
    ident: 'user',
    hideUserInfoAuth: true,
    animated: false,
    compangjob: [
      {
        jobname: '服务员/保洁', usertag: [{ tagbq: '女' }, { tagbq: '29岁' }, { tagbq: '3000-5000/月' }],
        name: '张三', tximg: '/img/tx.png', hxtime: '10分钟前', sqname: '天源社区', companyjuli: '1.2',
      },
      {
        jobname: '服务员/保洁', usertag: [{ tagbq: '女' }, { tagbq: '29岁' }, { tagbq: '3000-5000/月' }],
        name: '李四', tximg: '/img/tx.png', hxtime: '10分钟前', sqname: '天源社区', companyjuli: '1.2',
      },
      {
        jobname: '服务员/保洁', usertag: [{ tagbq: '女' }, { tagbq: '29岁' }, { tagbq: '3000-5000/月' }],
        name: '王二', tximg: '/img/tx.png', hxtime: '10分钟前', sqname: '天源社区', companyjuli: '1.2',
      },

    ],
    scene: "",
    nianl: [
      { nal: '30-40岁' }, { nal: '40-50岁' }, { nal: '50-60岁' },
    ],
    num2: '',
    wantjob: [
      { job: '保洁', id: 1, }, { job: '服务员', id: 2, }, { job: '保安', id: 3 }, { job: '保姆', id: 4 },
    ],
    xzyq: [
      { xz: '3K-5K' }, { xz: '5K-8K' }, { xz: '8K-10K' },
    ],
    ht: '',
    // 角色选择
    juesehide: true,
    // 实名认证
    smhide: true,
    // 求职者完善信息
    infows: true,
    //企业登录
    qydl: true,
    //提示用户需要获取手机号
    sjh: true,
    isShow: false,
    arrshow: true,

    // joblist: [
    //   { jobname: '清洁工', jobmoney: '3000-3800', companyname: '文和友餐饮有限公司', companytx: '/img/tx.png', jl: '1.5', phonenum: '13112345678' },
    //   { jobname: '清洁工', jobmoney: '3000-3800', companyname: '文和友餐饮有限公司', companytx: '/img/tx.png', jl: '1.5', phonenum: '13112345678' },
    //   { jobname: '清洁工', jobmoney: '3000-3800', companyname: '文和友餐饮有限公司', companytx: '/img/tx.png', jl: '1.5', phonenum: '13112345678' },
    // ],
  },

  state: {

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
          // positionData:positionData
        })
      }
    })
  },
  //求职者搜索函数
  searchjob() {
    wx.navigateTo({
      url: '/pages/searchpage/searchpage',
    })
  },
  //企业搜索函数
  searchjob1() {
    wx.navigateTo({
      url: '/pages/qysearch/qysearch',
    })
  },
  //添加意向
  btnExpectJob() {
    wx.navigateTo({
      url: '/pages/wantjob/wantjob',
    })
  },
  //＋发布招聘
  btnPostJob() {
    wx.navigateTo({
      url: '/pages/fbjob/fbjob',
    })
  },

  //求职者
  qzz: async function () {
    await this._handleRecruiteeSelected();
  },

  //招聘方
  zpf: async function () {
    await this._handleRecruiterSelected();
  },


  //实名认证提交
  smrztijsq() {
    let smhide = this.data.smhide
    this.setData({
      smhide: true,
      infows: false
    })
  },
  //完善信息
  wsxnhide() {
    let infows = this.data.infows
    this.setData({
      infows: true
    })
  },
  //提示用户需要获取手机号*确认*
  getPhoneNumber(e) {
    this.setData({
      sjh: true,
      juesehide: false
    })
  },
  //提示用户需要获取手机号*忽略*
  hulue() {
    this.setData({
      sjh: true,
      // juesehide:false
    })
  },

  setPhone(openid, phone) {
    wx.request({
      url: app.globalData.web_path + '/gywm/setWxuserPhone',
      data: {
        openid: openid,
        phone: phone,
      },
      header: app.globalData.header,
      success: function (res) {
        console.log(res)
        // that.openAlert(scene);
      },
      fail: function (res) {
      }
    })
  },


  // 年龄选择
  nlxz(e) {
    let that = this;
    let index = e.currentTarget.dataset.index2;
    that.setData({
      num2: index
    })
  },
  //想从事的工作
  wanjob(e) {
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

  // 求职者完善信息end
  //企业登录
  qydltijsq() {
    let qydl = this.data.qydl
    this.setData({
      qydl: true
    })
  },

  onLoad(options) {
    console.debug('index onLoad');
    let that = this
    //自定义头部方法
    this.setData({
      navH: app.globalData.navHeight,
      margtop: app.globalData.navHeight
    });
    this.data.wantjob[0].checked = true;
    this.setData({
      wantjob: this.data.wantjob,
    })
    //设置scroll-view的高度
    console.log(app.globalData.arrij.screenHeight)

    that.setData({
      ht: app.globalData.arrij.screenHeight - 119
    })
  },

  onShow() {
    this._loadPage();
  },

  onReachBottom: function () {
		this.loadContent();
	},


  _loadPage: async function () {
    await app.state.opendidReady;
    if (app.getGlobal(GlobalKey.IndexBootstrap)) {
      await this.bootstrap();
      await this.loadContent();

      app.setGlobal(GlobalKey.IndexBootstrap, false);
    }
  },

  ...bootstrap.createBootstrapMethod(),
  ...recruitee.createRecruiteeMethods(),
  ...recruiter.createRecruiterMethods(),
  ...content.createContentMethods(),
})
