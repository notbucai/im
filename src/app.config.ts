export default {
  pages: [
    'pages/a/index',
    'pages/test/index',
  ],
  tabBar: {
    list: [{
      'iconPath': 'assets/tabbar/xiaoxi.png',
      'selectedIconPath': 'assets/tabbar/xiaoxi_on.png',
      pagePath: 'pages/a/index',
      text: '消息'
    },
    {
      'iconPath': 'assets/tabbar/shenfen.png',
      'selectedIconPath': 'assets/tabbar/shenfen_on.png',
      pagePath: 'pages/a/index',
      text: '联系人'
    },
    {
      'iconPath': 'assets/tabbar/wode.png',
      'selectedIconPath': 'assets/tabbar/wode_on.png',
      pagePath: 'pages/a/index',
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
