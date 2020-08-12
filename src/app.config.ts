export default {
  pages: [
    'pages/index/index',
    'pages/home/index',
    'pages/me/index',
    'pages/login/index',
    'pages/chat/index',
    'pages/user/index',
    'pages/linkman/index',
    'pages/blacklist/index',
    'pages/grouplist/index',
    'pages/userinfo/index',
    'pages/chatinfo/index',
    'pages/create-group/index',
    'pages/join-group/index',
    'pages/groupuserlist/index',
    'pages/invitation-group/index',
    'pages/a-session/index',
  ],
  tabBar: {
    list: [{
      'iconPath': 'assets/tabbar/xiaoxi.png',
      'selectedIconPath': 'assets/tabbar/xiaoxi_on.png',
      pagePath: 'pages/home/index',
      text: '消息'
    }, {
      'iconPath': 'assets/tabbar/shenfen.png',
      'selectedIconPath': 'assets/tabbar/shenfen_on.png',
      pagePath: 'pages/linkman/index',
      text: '联系人'
    }, {
      'iconPath': 'assets/tabbar/wode.png',
      'selectedIconPath': 'assets/tabbar/wode_on.png',
      pagePath: 'pages/me/index',
      text: '我的'
    }],
    'color': '#000',
    'selectedColor': '#00d8a0',
    'backgroundColor': '#fff',
    'borderStyle': 'white'
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}
