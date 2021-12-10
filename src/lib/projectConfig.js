const fs = require('fs-extra') // fs 的扩展，支持 promise 语法
const path = require('path')
const inquirer = require('inquirer')
const AwaitExtend = require('../../utils/try-catch-await')
const inquirerPrjCfg = require('../../config/inquirer.config').inquirerPrjCfg

module.exports = {
  /**
   * 自定义项目的 package.json 选项
   * @param {string} projectName 项目名
   * @param {sting} manual 手动配置
   */
  async customConfig (projectName, manual) {
    // 1. 获取项目信息
    let cfgAnswers = null
    if (manual) {
      // 目前提供以下6项配置，可扩展
      let questions = [
        inquirerPrjCfg('NAME', {name: 'name', default: projectName}),
        inquirerPrjCfg('VERSION', {name: 'version', default: '1.0.0'}),
        inquirerPrjCfg('DESC', {name: 'description', default: ''}),
        inquirerPrjCfg('AUTHOR', {name: 'author', default: ''}),
        inquirerPrjCfg('ENTRY', {name: 'main', default: 'main.js'}),
        inquirerPrjCfg('LICENSE', {name: 'license', default: 'MIT'})
      ]
      cfgAnswers = await inquirer.prompt(questions);
    } else {
      // 默认 只设置 name
      cfgAnswers = {name: projectName, main: 'main.js'}
    }

    return cfgAnswers;
  },

  /**
   * package.json 配置
   * @param {string} targetDir 项目创建文件目录
   * @param {string} customConfig 需配置的项
   */
  async settingConfig (targetDir, customConfig) {
    // 1. 入口文件重命名
    const oldPath = path.join(targetDir, './src/main.js')
    const newPath = path.join(targetDir, `./src/${customConfig.main}`)
    const [renameRes, renameStatus] = await AwaitExtend(fs.rename, {}, oldPath, newPath)
    if (renameStatus === 'fail') return false;

    // 2. 解析现有 package.json
    const packagePath = path.join(targetDir, 'package.json');
    const [packageJson, readStatus] = await AwaitExtend(fs.readJson, {}, packagePath);
    if (readStatus === 'fail') return false;

    // 3. 保存最新信息
    const jsonStr = JSON.stringify(Object.assign(packageJson, customConfig), '', '\t')
    const [writeRes, writeStatus] = await AwaitExtend(fs.writeFile, {}, packagePath, jsonStr)
    if (writeStatus === 'fail') return false;
    return true;
  }
}