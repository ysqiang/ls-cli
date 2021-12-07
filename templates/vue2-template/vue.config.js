
module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? '/welldemo' : '',
  productionSourceMap:false,
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    }
  },
  devServer: {
    // 代理
    proxy: {
      '/xds': {
        target: `http://172.26.1.20:8080`,
        changeOrigin: true,
      },
    },
  },
}