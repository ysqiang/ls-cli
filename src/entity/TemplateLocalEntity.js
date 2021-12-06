const inquirer = require('inquirer')
const AwaitExtend = require('../../utils/try-catch-await')
const langs = require('../../utils/i18n').getI18n();
const inquirerTPL = require('../../config/inquirer.config').inquirerTPL;
const TPLPattern = require('./TPLPattern')
const TPLRepos = require('../../templates/tpl.json')

class TemplateLocalEntity extends TPLPattern{
  constructor(name, targetDir) {
    super(name, targetDir)
  }

  // 获取模版列表
  async getTPLList() {
    // 解析模版列表
    const tplList = TPLRepos.TPLList.map(item=>item.name)

    return tplList;
  }

  // 获取模版名
  async getTPLName() {
    // 解析模版列表
    const tplList = TPLRepos.TPLList.map(item=>item.name)

    // 交互选择具体模版
    const {tpl} = await inquirer.prompt(inquirerTPL('TPL_LIST', {name:'tpl', dataSrc:tplList}));

    return tpl;
  }

  // 获取模版的具体版本
  async getTPLTag(tplName){
    // 解析选择模版信息
    const tplDetail = TPLRepos.TPLList.find(item => item.name === tplName);

    // 版本显示列表
    const tagList = tplDetail.versions.map(item => (`${item.tag}  ${item.desc || ''}`));
    
    // 交互选择具体版本
    const { version } = await inquirer.prompt(inquirerTPL('TPL_VER_LIST', {name:'version', dataSrc:tagList}));
    
    return version
  }

  // 下载目录模版
  downloadTPL(tplName, tplVersion) {
    const path = require('path');
    const tplPath = path.join(__dirname, '../../templates', tplName)

    const fs = require('fs-extra');
    if (!fs.existsSync(this.targetDir)) {
      fs.mkdirsSync(this.targetDir)
    }
    fs.copySync(tplPath, this.targetDir)

    return true;
  }

}

module.exports = TemplateLocalEntity;