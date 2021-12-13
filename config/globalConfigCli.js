// 脚手架 config 默认选项
const DEFAULT_CONF = {
  current_langs: 'zh_cn', // 当前国际化语言，默认zh_cn
  request_timeout: '60000', // 请求超时设置，默认 1分钟，即 60000ms
  is_init: false, // 标识是否已初始化
}

// 全局配置 config 指令
const CONF_CLI_ENUM = {
  SET: 'set',
  GET: 'get',
  HAS: 'has',
  DELETE: 'delete',
  LIST: 'list',
  CLEAR: 'clear'
}
const CONF_CLI = Object.values(CONF_CLI_ENUM);

module.exports = {
  DEFAULT_CONF,
  CONF_CLI_ENUM,
  CONF_CLI
}