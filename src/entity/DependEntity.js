const execSync = require('child_process').execSync;
const AwaitExtend = require('../../utils/try-catch-await')
const langs = require('../../utils/i18n').getI18n();

class DependEntity {
  constructor(targetDir) {
    this.targetDir = targetDir;
    this.deps = [];
  }

  parseDeps(){
    const devConfig = require(`${this.targetDir}/package.json`)
    const depLibs = Object.assign(devConfig.devDependencies, devConfig.dependencies);
    
    Object.keys(depLibs).forEach(key => {
      if (key && depLibs[key]) {
        this.deps.push(`${key}@${depLibs[key].replace(/^[\^|~].*?/, '')}`)
      }
    })
  }

  async installed(){
    this.parseDeps();
    
    // 进入安装目录，安装依赖项
    // const cmdStr = `cd ${this.targetDir} && npm i ${this.deps.join(' ')}`;
    const cmdStr = `cd ${this.targetDir} && npm i`;
    const [res, status] = await AwaitExtend(execSync, {showLoading: true, msg: langs.Deps.Installing}, cmdStr);
    return [res, status];
  }

  uninstalled() {
    console.log('********* uninstalled depends ')
  }
}

module.exports = DependEntity;



/*
// 跨平台执行命令
// const spawn = require('cross-spawn')

// 子线程运行安装
// const exec = require('child_process').exec;
// const dependencies = ['vue']
// const installHandle = spawn('cnpm', ['install', '-D'].concat(dependencies), {
//   stdio: 'inherit'
// });
// installHandle.on('close', function(code) {
//   if (code !== 0) {
//     console.log('Install failed!');
//     process.exit(1)
//   } else {
//     console.log(chalk.cyan('Install finished'))
//   }
// })


// exec(cmdStr, (error, stdout) => {
//   if (error) {
//     console.error(`exec error: ${error}`);
//     return;
//   } else {
//     console.log(`exec success: ${stdout}`);
//   }
// })

// const res = await execSync(cmdStr);

// let child = exec(cmdStr);
// child.stdout.on('data', function(data) {
//     console.log(data);
// });
// child.stderr.on('data', function(data) {
//     console.log('Error: ' + data);
// });
// child.on('close', function(code) {
// });*/
