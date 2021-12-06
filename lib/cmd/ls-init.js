//【commander】用来编写指令和处理命令行的
const commander = require('commander')

//【chalk】用来修改控制台输出内容样式. 如：背景色，字体，粗细等
const chalk = require('chalk')

//【ora】进度条
const ora = require('ora')

// 系统内置API
const fs = require('fs')
const exec = require('child_process').exec;
const execSync = require('child_process').execSync;

// 模版信息
const tplObj = require(`${__dirname}/../../template`)


commander.usage('<template-name> [project-name]')

// 参数格式必须为：<template-name> [project-name]
if (process.argv.length <= 3) return commander.help()

commander.parse(process.argv)

console.log(commander.args)

// 解析
let [cmd, templateName, projectName] = commander.args

if (!tplObj[templateName] || !projectName || !projectName.trim()) {
    console.log(chalk.red('Template does not exist or project name should not be empty!'))
    return
}
console.log(chalk.white('start create....'))

const spinner = ora('generating...')
startCreate(templateName, projectName);

function startCreate(tplName, prjName){
    spinner.start()

    if (fs.existsSync(`${prjName}`)){
        execSync(`rm -rf ${prjName}`)
    }
    
    let url = tplObj[tplName]
    
    // const cmdStr = `git clone ${url} ${projectName} && cd ${projectName} && git checkout ${branch}`;
    const cmdStr = `git clone ${url} ${prjName}`;
    exec(cmdStr, (err) => {
        // spinner.succeed()
        clearRedundantFiles(err, prjName)
    })
}


function clearRedundantFiles(err, projName) {
    if (err) {
        console.log(chalk.red(err))
        process.exit();
    }

    exec(`cd ${projName} && rm -rf .git && rm -rf .gitee`, (err) => {
        if (err) {
            console.log(chalk.red(err))
            process.exit();
        }

        console.log(chalk.green('初始化成功！'))
        spinner.stop();
        process.exit()
    })
}






