//【commander】用来编写指令和处理命令行的
const commander = require('commander')

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

const fs = require('fs')

const tplObj = require(`${__dirname}/../template`)

commander.usage('<template-name> [project-name]')

// 参数格式必须为：<template-name> [project-name]
if (process.argv.length <= 3) return commander.help()

commander.parse(process.argv)

// 解析
let [templateName, projectName] = commander.args

if (!tplObj[templateName] || !projectName || !projectName.trim()) {
    console.log(chalk.red('Template does not exist or project name should not be empty!'))
    return
}
console.log(chalk.white('start create....'))

let pathOrUrl = tplObj[templateName]

const progress = ora('generating...')
progress.start()

console.log('ssss', pathOrUrl, projectName)
download(pathOrUrl, `../${projectName}`, {clone:false}, function(err)  {
    console.log(err)

    progress.succeed();
})






