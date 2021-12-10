const fs = require('fs-extra') // fs 的扩展，支持 promise 语法
const Conf = require('conf');


module.exports = {
  init () {
    
    // 可通过此配置用于控制 默认国际化
    const config = new Conf()
    console.log('******** w2w ', config.get('author'), config.get('version'))

    // config.set('name', 'apptest')
    // config.set('author', 'llls')
    // config.set('version', '1.2.1')
    // config.set('description', 'apptest desc')
    // config.set('main', 'main.js')
    // config.set('license', 'isc')

    console.log('******** write json success')


  }
}