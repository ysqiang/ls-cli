const fs = require('fs-extra') // fs 的扩展，支持 promise 语法
const inquirer = require('inquirer') // 提示交互

const inquirerCreate = require('../../config/inquirer.config').inquirerCreate


module.exports = async function(targetDir, name, options) {

  // 目录文件是否存在
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

  const bSuccess = await tplObj.create();
  if (!bSuccess) return;

  return true;
}