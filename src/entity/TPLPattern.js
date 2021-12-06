/**
 * 【模版设计模式】
 * 利用此模式对模版进行不同方式的获取
 * 1. 远程 git 库
 * 2. 本地 template 
 */
class TPLPattern{

  constructor(name, targetDir) {
    // 项目名称
    this.name = name

    // 模版下载目录
    this.targetDir = targetDir;
  }

  // 获取模版名
  getTPLName() {
    return ''
  }

  // 获取模版的具体版本
  getTPLTag(tplName){
    return ''
  }

  // 下载目录模版
  downloadTPL(tplName, tplVersion) {
    return true;
  }

  /**
   * 创建模版
   */
  async create () {
    try{
      // 获取模版
      const tplName = await this.getTPLName();
      if (!tplName) return;

      // 模版版本选取格式：版本 + 空格 + 描述
      const tplVer = await this.getTPLTag(tplName);
      if (!tplVer) return;

      const tplVerArr = tplVer.split(' ');
      const tplVersion = tplVerArr.length > 1 ? tplVerArr[0] : tplVerArr;

      // 下载模版并生成项目默认目录
      const success = await this.downloadTPL(tplName, tplVersion)
      if (!success) return;
      
      return true;
    } catch (err){
      return new Error(err.message)
    }
  }
}

module.exports = TPLPattern;