const { Completer } = require('./utils/function_util');
const Global = require('./service/global_service');

// app.js
App({
  globalData: {
    // web_path : "https://demo.csjing.com",//线上
    // web_path : "http://localhost:8083",//测试
    web_path: "https://localhost:442",//测试
    header: {
      Token: "",
      Cookie: "",
      'content-type': 'application/x-www-form-urlencoded'
    },
    "appId": "wx8a8bbe94ca734afd", //测试
    //   "appId" : "wx96d6e30c9f677d52",
    userInfo: {},
    openidReady: null,
  },

  state: {
    openidReady: null,
    // openid 的完成器，用于手动完成 openid 的 promise（即 openidReady）
    openidCompl: null,
    // 当前的 openid
    openid: null,
  },

  getOpenid: function () {
    if (!this.state.openid) {
      console.error("openid 还没有加载完成");
    }
    return this.state.openid;
  },

  getOpenidReady() {
    if (!this.state.openidReady) {
      console.error('openidReady 还没有实例化');
    }
    return this.state.openidReady;
  },

  getGlobal(k) {
    let v = this.state.globalService.get(k);
    console.debug(`获取全局值<${k},${v}>`);
    return v;
  },

  setGlobal(k, v) {
    console.debug(`设置全局值<${k},${v}>`);
    return this.state.globalService.set(k, v);
  },


  onLaunch() {
    this._doInit();
  },

  _doInit() {
    // 初始化全局变量（例如监听器等）
    this._initGlobal();
    // 初始化 openid 的获取状态
    this._initOpenidState();
    // 实际的登录
    this._doLogin();
  },

  _doLogin() {
    let openidCompl = this.state.openidCompl;

    var that = this;
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wx.request({
            url: that.globalData.web_path + '/wx/user/' + that.globalData.appId + '/login',
            data: {
              code: res.code,
              loginType: 'openid'
            },
            header: that.globalData.header,
            success: function (res) {
              console.info(`当前登录用户的 openid 为 ${res.data.data.openid}`);
              console.log(res);

              // 将openid  缓存
              let openid = res.data.data.openid;
              wx.setStorageSync('openid', openid);
              wx.setStorageSync('sessionKey', res.data.data.sessionKey);

              // 已经完成了 openid 的获取
              openidCompl.resolve(openid);
              that.state.openid = openid;
            },
            fail: function (e) {
              // 获取失败，需要查看控制台错误信息
              openidCompl.reject(e);
            }
          });
        }
      }
    });


    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    var arrij = []

    // 获取顶部栏信息
    wx.getSystemInfo({
      success: res => {
        // console.log(res)
        //导航高度
        this.globalData.arrij = res
        this.globalData.navHeight = res.statusBarHeight + 46;
      }, fail(err) {
        console.log(err);
      }
    })
  },

  _initGlobal() {
    // 全局数据存储
    this.state.globalService = new Global.GlobalService(this);
    Global.initGlobal(this);
  },

  _initOpenidState() {
    // 设置一个 Promise，等待 openid 完成
    let openidReadyCompl = new Completer();
    this.state.openidCompl = openidReadyCompl;
    this.state.openidReady = openidReadyCompl.promise;
  },




  //时间戳格式化

  formatDate: function (now, mask) {
    var d = new Date(now);
    var zeroize = function (value, length) {
      if (!length) length = 2;
      value = String(value);
      for (var i = 0, zeros = ''; i < (length - value.length); i++) {
        zeros += '0';
      }
      return zeros + value;
    };
    return mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function ($0) {
      switch ($0) {
        case 'd': return d.getDate();
        case 'dd': return zeroize(d.getDate());
        case 'ddd': return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][d.getDay()];
        case 'dddd': return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()];
        case 'M': return d.getMonth() + 1;
        case 'MM': return zeroize(d.getMonth() + 1);
        case 'MMM': return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
        case 'MMMM': return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()];
        case 'yy': return String(d.getFullYear()).substr(2);
        case 'yyyy': return d.getFullYear();
        case 'h': return d.getHours() % 12 || 12;
        case 'hh': return zeroize(d.getHours() % 12 || 12);
        case 'H': return d.getHours();
        case 'HH': return zeroize(d.getHours());
        case 'm': return d.getMinutes();
        case 'mm': return zeroize(d.getMinutes());
        case 's': return d.getSeconds();
        case 'ss': return zeroize(d.getSeconds());
        case 'l': return zeroize(d.getMilliseconds(), 3);
        case 'L': var m = d.getMilliseconds();
          if (m > 99) m = Math.round(m / 10);
          return zeroize(m);
        case 'tt': return d.getHours() < 12 ? 'am' : 'pm';
        case 'TT': return d.getHours() < 12 ? 'AM' : 'PM';
        case 'Z': return d.toUTCString().match(/[A-Z]+$/);
        default: return $0.substr(1, $0.length - 2);
      }
    });
  },
})
