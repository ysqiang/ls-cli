//【inquirer】交互式命令行工具，如：输入，选择，数字等
const inquirer = require('inquirer')

//【chalk】用来修改控制台输出内容样式. 如：背景色，字体，粗细等
const chalk = require('chalk')

const fs = require('fs')

const tplObj = require(`${__dirname}/../template`)

// 交互式命令及校验
let questions = [
    {
        name: 'name',
        type: 'input',
        message: 'please input name of the template you want to delete',
        validate(val){
            if (val === '' || val.trim().length === 0){
                return 'Name is required!'
            }else if (!tplObj[val.trim()]){
                return 'Template does not exist!'
            }else {
                return true
            }
        }
    }
]

inquirer.prompt(questions)
        .then(answers => {
            // 解析输入的 name 、 url 
            let {name} = answers;
 
            // 删除模版
            delete tplObj[name]

            // 更新 template.json
            fs.writeFile(`${__dirname}/../template.json`, JSON.stringify(tplObj), 'utf-8', err =>{
                if (err) console.log(chalk.red(err))

                console.log('\n')
                console.log(chalk.green('Deleted successfully!\n'))
                console.log(chalk.grey('The latest template list is: '))
                console.log(tplObj)
                console.log('\n')

            })
        })