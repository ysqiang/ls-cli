const inquirer = require('inquirer')
const util = require('util')
const downloadGitRepo = require('download-git-repo')
const AwaitExtend = require('../../utils/try-catch-await')
const langs = require('../../utils/i18n').getI18n();
const inquirerTPL = require('../../config/inquirer.config').inquirerTPL;
const { getRepoList, getAllTagsByRepo, downloadGitRepo2TPL } = require('../services/template.api')
const TPLPattern = require('./TPLPattern')
/**
 * 模版主要依赖于 gitee/github/其他 仓库
 */
class TemplateEntity extends TPLPattern {
  constructor (name, targetDir) {
    super(name, targetDir);

    // util.promisify 用于 Promise 改造
    this.downloadGitRepo = util.promisify(downloadGitRepo)
  }

  // 获取模版列表
  async getTPLList() {

    const [repoList, status] = await AwaitExtend(getRepoList, {showLoading: true, msg: langs.Loading.TPLList});
    if (status === 'fail') return;

    // 仓库列表信息 转为 模版名称列表
    const tplList = repoList.map(item=> item.name);

    return tplList;
  }

  // 获取模版名
  async getTPLName() {

    // const repoList = await getRepoList();
    const [repoList, status] = await AwaitExtend(getRepoList, {showLoading: true, msg: langs.Loading.TPLList});
    if (status === 'fail') return;

    // 仓库列表信息 转为 模版名称列表
    const tplList = repoList.map(item=> item.name);

    // 交互选择具体模版
    const {tpl} = await inquirer.prompt(inquirerTPL('TPL_LIST', {name:'tpl', dataSrc:tplList}));

    return tpl;
  }

  // 获取模版的具体版本
  async getTPLTag(tplName){

    // 获取版本列表详细信息
    // const tplVersions = await getAllTagsByRepo(tplName)
    const [tplVersions, status] = await AwaitExtend(getAllTagsByRepo, {showLoading: true, msg: langs.Loading.TPLVersionList}, tplName);
    if (status === 'fail') return;

    // 版本显示列表
    const tagList = tplVersions.map(item => (`${item.name}  ${item.message || ''}`));
    
    // 交互选择具体版本
    const { version } = await inquirer.prompt(inquirerTPL('TPL_VER_LIST', {name:'version', dataSrc:tagList}));
    
    return version;
  }

  // 下载目录模版
  async downloadTPL(tplName, tplVersion) {
    
    // const res = await downloadGitRepo2TPL(this.downloadGitRepo, this.targetDir, tplName, tplVersion);
    const [res, status] = await AwaitExtend(downloadGitRepo2TPL, {showLoading: true, msg: langs.Loading.TPLDir}, this.downloadGitRepo, this.targetDir, tplName, tplVersion) 
    return status === 'success';
  }

  /**
   * 创建模版
   */
  // async create () {

  //   // 获取模版
  //   const tplName = await this.getTPLName();
  //   if (!tplName) return;

  //   // 模版版本选取格式：版本 + 空格 + 描述
  //   const tplVer = await this.getTPLTag(tplName);
  //   if (!tplVer) return;

  //   const tplVerArr = tplVer.split(' ');
  //   const tplVersion = tplVerArr.length > 1 ? tplVerArr[0] : tplVerArr;

  //   // 下载模版并生成项目默认目录
  //   const success = await this.downloadTPL(tplName, tplVersion)
  //   if (!success) return;
    
  //   return true;
  // }
}

module.exports = TemplateEntity;