const fs = require('fs-extra')

const langs = require('../../utils/i18n').getI18n();

module.exports = async function(options) {

  if (options.template) { // 模版列表
    let tplObj = null;
    switch(options.template) {
      case 'local': // 没网的情况下，利用离线模版
        const TPLLocalEntity = require('../entity/TemplateLocalEntity')
        tplObj = new TPLLocalEntity("", "");
        break;
      case 'remote':
      default:
        const TPLGitEntity = require('../entity/TemplateGitEntity')
        tplObj = new TPLGitEntity("ame", "");
        break;
    }

    const tplList = await tplObj.getTPLList();
    if (tplList && tplList.length > 0) {
      const {table} = require('table')
      let tableCtor = [[`${langs.ListCli.Table.TH1}`, `${langs.ListCli.Table.TH2}`]]
      for (let i = 0; i < tplList.length; i++) {
        tableCtor.push([i+1, tplList[i]]);
      }
      console.log(table(tableCtor))
    }
  }

  if (options.i18n) {
    // 利用遍历文件夹所有文件，除却 index.js
    const path = require('path')
    const langsDir = path.join(__dirname, '../../langs');
    const fileList = fs.readdirSync(langsDir);
    if (Array.isArray(fileList)) {
      const langRegexp = /^(\w+_\w+)*?\.json$/g;
      const langFileList = fileList.filter(item => langRegexp.test(item))

      const {table} = require('table')
      let tableCtor = [[`${langs.ListCli.Table.TH1}`, `${langs.ListCli.Table.TH3}`]]
      for (let i = 0; i < langFileList.length; i++) {
        tableCtor.push([i + 1, langFileList[i].replace(langRegexp, (res, $1) => $1)]);
      }
      console.log(table(tableCtor))
    }
  }

  if (options.config) {
    const globalConf = require('./globalConfig');
    const confObj = globalConf.list();

    const {table} = require('table')
    let tableCtor = [[`${langs.ListCli.Table.TH1}`, `${langs.ListCli.Table.TH4}`, `${langs.ListCli.Table.TH5}`]]
    let i = 1;
    for (key in confObj) {
      tableCtor.push([i++, key, confObj[key]]);
    }
    console.log(table(tableCtor))
  }

  return true;
}