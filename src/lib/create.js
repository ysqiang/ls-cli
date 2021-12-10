const fs = require('fs-extra') // fs 的扩展，支持 promise 语法
const inquirer = require('inquirer') // 提示交互

const projectCfg = require('./projectConfig.js') // 项目package.json配置
const depsInstall = require('./installDeps'); // 依赖安装
const inquirerCreate = require('../../config/inquirer.config').inquirerCreate
const langs = require('../../utils/i18n').getI18n();

module.exports = async function(targetDir, name, options) {

  // 手动配置判断
  let {manual} = await inquirer.prompt(inquirerCreate('MANUAL', {name:'manual'})) 

  // 项目配置
  const prjConfig = await projectCfg.customConfig(name, manual);

  // 依赖安装控制
  let isInstalled = false
  if (manual) {
    isInstalled = await depsInstall.used(targetDir);
  }
  
  // 目录文件是否存在
  if (manual){
    if (fs.existsSync(targetDir)) {
      if (options.force) { // 强制创建
        await fs.remove(targetDir)
      } else {
        let {overwrite} = await inquirer.prompt(inquirerCreate('OVERWRITE', {name:'overwrite'}))
      
        if (overwrite) {
          await fs.remove(targetDir)
        }
      }
    }
  } else {
    if (fs.existsSync(targetDir)) {
      await fs.remove(targetDir)
    }
  }
  


  // 模版目录数据源情况
  let tplObj = null;
  switch(options.source) {
    case 'local': // 没网的情况下，利用离线模版
      const TPLLocalEntity = require('../entity/TemplateLocalEntity')
      tplObj = new TPLLocalEntity(name, targetDir);
      break;
    case 'remote':
    default:
      const TPLGitEntity = require('../entity/TemplateGitEntity')
      tplObj = new TPLGitEntity(name, targetDir);
      break;
  }

  // 模版目录创建
  let bSuccess = await tplObj.create();
  if (!bSuccess) return false;

  // package.json 配置
  bSuccess = await projectCfg.settingConfig(targetDir, prjConfig)
  if (!bSuccess) return false;

  // 安装依赖
  if (isInstalled) {
    const [res, status] = await depsInstall.installed();
    const chalk = require('chalk')
    isInstalled = status === 'success';
    if (!isInstalled) {
      console.log(`${chalk.red(`${langs.Deps.IstFailure}`)}`)
    } else {
      console.log(`${chalk.green(`${langs.Deps.IstSuccess}`)}`)
    }
  } 

  return true;
}