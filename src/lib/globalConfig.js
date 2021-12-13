const fs = require('fs-extra') // fs 的扩展，支持 promise 语法
const Conf = require('conf')
const langs = require('../../utils/i18n').getI18n();

// 配置脚手架指令
const {DEFAULT_CONF, CONF_CLI_ENUM, CONF_CLI} = require('../../config/globalConfigCli');

module.exports = {
  init () {
    const config = new Conf()

    if (config.has('is_init')) 
      return;
    config.set('is_init', true)

    // 1. 优先手动配置，再使用默认
    for(key in DEFAULT_CONF) {
      if (config.has(key))
        continue;
      config.set(key, DEFAULT_CONF[key]);
    }

    // 2. 脚手架全局配置文件路径
    if(!config.has('config_path')) {
      config.set('config_path', config.path)
    }

    // 
    // console.log('******** write json success', config.size, JSON.stringify(config.store))
  },
  get (key, defaultValue) {
    const config = new Conf()
    if (!this.has(key, config)) return '';
    return config.get(key, defaultValue)
  },
  set (key, value) {
    const config = new Conf()
    config.set(key, value)
    return true;
  },
  has (key, confInstance) {
    const config = confInstance || new Conf()
    return config.has(key)
  },
  delete(key) {
    const config = new Conf()
    if (!this.has(key, config)) return false;
    config.delete(key)
    return true;
  }, 
  list () {
    const config = new Conf()
    return config.store;
  },
  clear () {
    const config = new Conf()
    config.clear();
    return config.store;
  },
  hasCli(cmd) {
    return CONF_CLI.includes(cmd)
  },
  setting(cmd, options) {
    if (!this.hasCli(cmd)) 
      return;

    // 只针对 set
    if (options.value && cmd === CONF_CLI_ENUM.SET) {
      if (/^[\w|\-|_]+\=[\w|\-|_]+$/.test(options.value)) {
        const params = options.value.split('=')
        this[cmd](params[0], params[1]);
        return ['', true];
      } else {
        return [`${langs.ConfigCli.Error.PARAM}`, false];
      }
    }

    // 针对 get/has/delete 指令
    if (options.key && ![CONF_CLI_ENUM.SET, CONF_CLI_ENUM.LIST].includes(cmd)) {
      if (/^[\w|\-|_]+$/.test(options.key)) {
        let res = this[cmd](options.key)

        // 针对 get 特殊异常处理. 配置项不存在是，需提示
        if (cmd === CONF_CLI_ENUM.GET && res === '') 
          res = `${langs.ConfigCli.Error.OPT}`;
        return [res, true]
      } else {
        return [`${langs.ConfigCli.Error.PARAM}`, false]
      }
    }

    // list 列出所有项
    if ([CONF_CLI_ENUM.LIST, CONF_CLI_ENUM.CLEAR].includes(cmd)) {
      const res = this[cmd]();
      return [res, true]
    }

    return [`${langs.ConfigCli.Error.PARAM}`, false]
  }
}