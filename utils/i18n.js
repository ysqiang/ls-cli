/**
 * 国际化
 * 【使用说明】
 * 1. 必需先注册,再使用.默认使用中文
 * 2. 通过注册的信息，动态加载语言信息
 */

let default_lang = 'zh_cn'

module.exports = {
  isRegistered: false,
  curr_langs: {},
  register:function (locale){
    try {
      this.isRegistered = true;
      this.curr_langs = require(`../langs/${locale || default_lang}.json`);
      return this;
    } catch (err) {
      this.unregister();
      new Error(`【${locale}】 language does not exist`)
    }
  },

  unregister: function () {
    this.isRegistered = false,
    this.curr_langs = null;
  },

  getI18n: function() {
    if (!this.isRegistered) new Error(`【i18n】langs not registered`)
    return this.curr_langs;
  }
}