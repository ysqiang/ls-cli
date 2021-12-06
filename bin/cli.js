#! /usr/bin/env node
//【#! 说明】
// #! 符号的名称叫 Shebang 或 hashbang，必需位于文件的第一行
//【#! 用途】
// 通知OS此脚本使用哪个解释器运行。可以是任何解释语言如：Python、Perl等
//【#! 用法】
// 必须是解释器的绝对路径，或是通过环境变量设置。还可设置参数
// 如：[绝对路径]： #! /usr/bin/node
//    [环境变量]： #! /usr/bin/env node


//【#! 针对 cli.js 说明】
// 用于指定 cli.js 脚本的运行环境是 node。Node CLI 应用入口文件必须要有这样的文件头
// 如果是Linux 或者 macOS 系统下还需要修改此文件的读写权限为 777
// 具体就是通过 chmod 777 cli.js 实现修改


// 脚本命令创建
const cliCommand = require('commander')
const chalk = require('chalk')
const package = require('../package.json')

// 国际化语言切换
// const curr_lang = 'en_us' //zh_cn
// const langs = require(`../langs/${curr_lang}.json`)
const langs = require('../utils/i18n').register('zh_cn').getI18n();


// 脚手架版本和使用方式示例，以及配置脚本默认配置
cliCommand.version(`v${package.version}`)
          // .option('-c, --config <path>', 'set config path', './deploy.conf')
          .usage('<command> [option]')



// 切换语言
// cliCommand
//   .argument('<username>', 'user to login')
//   .argument('[password]', 'password for user, if required', 'no password given')
//   .action((username, password) => {
//     console.log('username:', username);
//     console.log('password:', password);
//   });


// 指令创建.包括指令格式，描述，参数，指令具体回调
cliCommand.command(`create <${langs.CreateCli.AppName}>`)
          .description(`${langs.CreateCli.Description}`)
          .option('-f, --force', `${langs.CreateCli.Options.F}`)
          .option('-src, --source <template-source>', `${langs.CreateCli.Options.SRC}`)
          .action(async (name, options) => {
            // __dirname : 当前文件所在目录
            // path.resolve('./') 和 process.cwd() : 当前命令所在目录
            // 需创建的文件目录
            const path = require('path')
            const targetDir = path.join(process.cwd(), name);

            // 依赖安装控制
            const depsInstall = require('../src/lib/installDeps');
            let isInstalled = await depsInstall.used(targetDir);
            
            const bSuccess = await require('../src/lib/create')(targetDir, name, options)
            if (!bSuccess) return;

            if (isInstalled) {
              const [res, status] = await depsInstall.installed();
              isInstalled = status === 'success';
              if (!isInstalled) {
                console.log(`${chalk.red(`${langs.Deps.IstFailure}`)}`)
              } else {
                console.log(`${chalk.green(`${langs.Deps.IstSuccess}`)}`)
              }
            } 

            console.log(`\r\nls-cli ${chalk.magenta(`${langs.Cli.CreateSuccess}`)} ${chalk.green('"' + name + '"')}`)
            console.log(`\r\n${langs.Cli.StartPromt}: `)
            console.log(`\r\n  cd ${chalk.cyan(name)}`)
            if (!isInstalled) {
              console.log('  npm install or cnpm install')
            }
            console.log('  npm run dev\r\n')
          })

cliCommand.command(`list`)
          .description(`${langs.ListCli.Description}`)
          .option('-tpl, --template [template-source]', `${langs.ListCli.Options.TPL}`)
          .option('-i, --i18n', `${langs.ListCli.Options.I18N}`)
          .alias('ls')
          .action(async (options) => {
            // console.log('******* list ', options)
            const bSuccess = await require('../src/lib/list')(options)
          })

// 引入 help 中间件，重置 help 
require('../src/plugins/CommanderHelpPlugin').use(cliCommand, langs);

// 引入 error 中间件，扩展 error 相关信息
require('../src/plugins/CommanderErrorPlugin').use(cliCommand)


// 解析用户脚本指令及参数，若不合理给出提示          
cliCommand.parse(process.argv);
// 或
// if(!cliCommand.args.length){
//   cliCommand.help()
// }