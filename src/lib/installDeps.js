/**
 * 依赖安装只进行一次
 */
const inquirer = require('inquirer') // 提示交互
// const DependEntity = require('../entity/DependEntity');
const inquirerDeps = require('../../config/inquirer.config').inquirerDeps

module.exports = {
  isCanInstalled: false,
  dependObj: null,

  async used(path) {
    if (this.dependObj) return;

    let {installed} = await inquirer.prompt(inquirerDeps("INSTALL", {name: 'installed'}))
    
    if (installed) {
      const DependEntity = require('../entity/DependEntity');
      this.dependObj = new DependEntity(path);
    }

    this.isCanInstalled = installed;
    return installed;
  },

  async installed() {
    if (!this.isCanInstalled || !this.dependObj) return;

    const [res, status] = await this.dependObj.installed();

    this.isCanInstalled = false;
    return [res, status] ;
  }
}




