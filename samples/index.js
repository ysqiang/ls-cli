//【commander】用来编写指令和处理命令行的
const program = require('commander')

//【inquirer】交互式命令行工具，如：输入，选择，数字等
const inquirer = require('inquirer')

//【chalk】用来修改控制台输出内容样式. 如：背景色，字体，粗细等
const chalk = require('chalk')

//【ora】进度条
const ora = require('ora')

//【download-git-repo】从 git 库下载模版文件
// 格式：download(repository, destination, options, callback)
// repository 仓库地址；
// destination 存放文件路径，默认就是当前目录；
// options 配置，如：{ clone：boolean } 下载方式：http download ｜ git clone 
// callback 回调
const download = require('download-git-repo')



let progress = ora('download...')
progress.start()

program.version('1.0.0')
       .command('init', 'create a new project from a template') // init 指令
       .action(()=>{
            console.log(chalk.green('初始化完成'))
            // inquirer.prompt(['AAA', 'BBB'])  // 提示语句
            //         .then(answers => {  // 回复结果
            //             console.log(answers) 
            //         })
       })

// console.log(process.argv)
program.parse(process.argv)

progress.stop()

