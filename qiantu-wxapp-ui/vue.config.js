// const url = 'http://test.qanto.cn:8180'
const url = 'http://10.10.28.47:8061'  //志斌
// const url = 'http://10.10.29.11:8061' //钰堃
// const url = 'https://mini.qanto.cn'
// const url = 'https://b17dce6e.ngrok.io'
// 基础路径，发布前修改这里,当前配置打包出来的资源都是相对路径
let publicPath = './'
module.exports = {
  publicPath: publicPath,
  lintOnSave: true,
  productionSourceMap: false,
  chainWebpack: config => {
    // 忽略的打包文件
    config.externals({
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios',
      'element-ui': 'ELEMENT'
    })
    const entry = config.entry('app')
    entry
      .add('babel-polyfill')
      .end()
    entry
      .add('classlist-polyfill')
      .end()
  },
  // 配置转发代理
  devServer: {
    proxy: {
      '/mp/': {
        target: url + '/mp',
        ws: true,
        pathRewrite: {
          '^/mp': '/'
        }
      },
      '/management': {
        target: url,
        ws: true,
        pathRewrite: {
          '^/management': '/management'
        }
      }
    }
  }
}
